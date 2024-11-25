

// Función principal para realizar la compra
async function attemptPurchase(tradingSymbol, companyName, pricePerShare, numberOfShares) {

    // Calcular el valor total
    const totalValue = pricePerShare * numberOfShares;

    // Datos a enviar
    const purchaseData = {
        symbol: tradingSymbol,
        companyName: companyName,
        stockPrice: pricePerShare,
        numOfShares: numberOfShares,
        totalValue: totalValue
    };

    try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3000/db/create-purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchaseData)
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        return { success: true, message: 'Compra realizada con éxito' };
    } catch (error) {
        return { success: false, message: `Error al realizar la compra: ${error.message}` };
    }
}

export { attemptPurchase };