// Ensure this code is at the top of your file to select the refresh button
const refreshBtn = document.querySelector('.transactions__refresh-btn');

async function updateTable() {
    const url = 'http://localhost:3000/db/get-purchases';

    try {
        const response = await fetch(url);
        const purchases = await response.json();

        const tableBody = document.querySelector('.transactions__table tbody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizarla

        for (const purchase of purchases) {
            await calculateTableValues(purchase);
        }
    } catch (error) {
        console.error('Error al obtener las compras:', error.message);
    }
}

async function fetchStockChange(symbol) {
    const url = `http://localhost:3000/api/stock-change/${symbol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener el cambio de stock');
        }
        const data = await response.json();
        return data.percentageChange;
    } catch (error) {
        console.error('Error al obtener el cambio de stock:', error.message);
        return null;
    }
}

async function fetchCurrentPrice(symbol) {
    const url = `http://localhost:3000/api/stock/${symbol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener el precio actual de la acción');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el precio actual de la acción:', error.message);
        return null;
    }
}

function calculateGainLoss(initialPrice, currentPrice) {
    if (initialPrice === 0) {
        return 0;
    }
    return ((currentPrice - initialPrice) / initialPrice) * 100;
}

async function calculateTableValues(purchase) {
    const symbol = purchase.symbol;
    const pricePerShare = purchase.stockPrice;
    const shares = purchase.numOfShares;

    try {
        const stockChange = await fetchStockChange(symbol);
        const currentPrice = await fetchCurrentPrice(symbol);

        if (pricePerShare == null || currentPrice == null || shares == null) {
            console.error('Undefined values detected', { pricePerShare, currentPrice, shares });
            return;
        }

        const gainLossPercentage = calculateGainLoss(pricePerShare, currentPrice);
        const totalCurrentValue = currentPrice * shares;

        let data = {
            id: purchase.purchaseId,
            symbol: symbol,
            company: purchase.companyName,
            pricePerShare: pricePerShare,
            shares: shares,
            total: pricePerShare * shares,
            change24h: stockChange,
            currentPrice: currentPrice,
            gainLossPercentage: gainLossPercentage,
            totalCurrentValue: totalCurrentValue
        };
        
        addRowToTable(data);
        return true;
    } catch (error) {
        console.error('Error al calcular los valores de la tabla:', error.message);
        return { success: false, message: `Error al actualizar la tabla: ${error.message}` };
    }
}

async function deletePurchase(id) {
    const url = `http://localhost:3000/db/delete-purchase/${id}`;

    try {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error al eliminar la compra');
        }
        await updateTable();
    } catch (error) {
        console.error('Error al eliminar la compra:', error.message);
    }
}

function addRowToTable(data) {
    const tableBody = document.querySelector('.transactions__table tbody');
    const row = document.createElement('tr');
    row.classList.add('transactions__row');

    const change24hClass = data.change24h < 0 ? 'transactions__cell--change down' : 'transactions__cell--change';
    const gainLossClass = data.gainLossPercentage < 0 ? 'transactions__cell--change down' : 'transactions__cell--change';

    row.innerHTML = `
        <td class="transactions__cell">#${data.id}</td>
        <td class="transactions__cell transactions__cell--symbol">${data.symbol}</td>
        <td class="transactions__cell">${data.company}</td>
        <td class="transactions__cell">$${data.pricePerShare.toFixed(2)}</td>
        <td class="transactions__cell">${data.shares}</td>
        <td class="transactions__cell">$${data.total.toFixed(2)}</td>
        <td class="${change24hClass}">${data.change24h}%</td>
        <td class="transactions__cell">$${data.currentPrice.toFixed(2)}</td>
        <td class="${gainLossClass}">${data.gainLossPercentage.toFixed(2)}%</td>
        <td class="transactions__cell">$${data.totalCurrentValue.toFixed(2)}</td>
        <td class="transactions__cell transactions__cell--action">
            <button class="transactions__delete-btn" id="${data.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(row);
}

refreshBtn.addEventListener('click', async () => {
    await updateTable();
});

// Llamar a la función updateTable al cargar la página
window.addEventListener('load', updateTable);

export { updateTable, deletePurchase, addRowToTable };