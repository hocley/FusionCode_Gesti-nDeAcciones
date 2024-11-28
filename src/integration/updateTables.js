/**
 * Actualiza la tabla de transacciones obteniendo las compras desde el servidor.
 *
 * @returns {Promise<Object>} Objeto con estado de éxito de la actualización.
 */
async function updateTable() {
    console.log('Actualizando tabla de transacciones...');
    const url = 'http://localhost:3000/db/get-purchases';

    try {
        const respuesta = await fetch(url);
        const compras = await respuesta.json();

        const cuerpoTabla = document.querySelector('.transactions__table tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de actualizarla

        for (const compra of compras) {
            await calculateTableValues(compra);
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: `Error al actualizar la tabla: ${error.message}` };
    }
}

/**
 * Obtiene el cambio porcentual de una acción específica.
 *
 * @param {string} simbolo - Símbolo de la acción.
 * @returns {Promise<number|null>} Porcentaje de cambio o null si hay un error.
 */
async function fetchStockChange(simbolo) {
    const url = `http://localhost:3000/api/stock-change/${simbolo}`;
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error al obtener el cambio de stock');
        }
        const datosRespuesta = await respuesta.json();
        return datosRespuesta.percentageChange;
    } catch (error) {
        console.error('Error al obtener el cambio de stock:', error.message);
        return null;
    }
}

/**
 * Obtiene el precio actual de una acción.
 *
 * @param {string} simbolo - Símbolo de la acción.
 * @returns {Promise<number|null>} Precio actual de la acción o null si hay un error.
 */
async function fetchCurrentPrice(simbolo) {
    const url = `http://localhost:3000/api/stock/${simbolo}`;
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error al obtener el precio actual de la acción');
        }
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el precio actual de la acción:', error.message);
        return null;
    }
}

/**
 * Calcula el porcentaje de ganancia o pérdida.
 *
 * @param {number} precioInicial - Precio inicial de la acción.
 * @param {number} precioActual - Precio actual de la acción.
 * @returns {number} Porcentaje de ganancia o pérdida.
 */
function calculateGainLoss(precioInicial, precioActual) {
    if (precioInicial === 0) {
        return 0;
    }
    return ((precioActual - precioInicial) / precioInicial) * 100;
}

/**
 * Calcula los valores para una fila de la tabla de transacciones.
 *
 * @param {Object} compra - Objeto con los detalles de la compra.
 * @returns {Promise<boolean|Object>} Resultado del cálculo de valores.
 */
async function calculateTableValues(compra) {
    const simbolo = compra.symbol;
    const precioPorAccion = compra.stockPrice;
    const cantidadAcciones = compra.numOfShares;

    try {
        const cambioAccion = await fetchStockChange(simbolo);
        const precioActual = await fetchCurrentPrice(simbolo);

        if (precioPorAccion == null || precioActual == null || cantidadAcciones == null) {
            console.error('Valores no definidos detectados', { precioPorAccion, precioActual, cantidadAcciones });
            return;
        }

        const porcentajeGanancia = calculateGainLoss(precioPorAccion, precioActual);
        const gananciaPerdidaDolares = (porcentajeGanancia / 100) * precioPorAccion * cantidadAcciones;
        const valorTotalActual = precioActual * cantidadAcciones;

        const datosTabla = {
            id: compra.purchaseId,
            date: compra.date,
            symbol: simbolo,
            company: compra.companyName,
            pricePerShare: precioPorAccion,
            shares: cantidadAcciones,
            total: precioPorAccion * cantidadAcciones,
            change24h: cambioAccion,
            currentPrice: precioActual,
            gainLossPercentage: porcentajeGanancia,
            gainLossDollar: gananciaPerdidaDolares,
            totalCurrentValue: valorTotalActual
        };

        addRowToTable(datosTabla);
        return true;
    } catch (error) {
        console.error('Error al calcular los valores de la tabla:', error.message);
        return { success: false, message: `Error al actualizar la tabla: ${error.message}` };
    }
}

/**
 * Elimina una compra del sistema por su ID.
 *
 * @param {number} id - Identificador de la compra a eliminar.
 * @returns {Promise<{success: boolean}>}
 */
async function deletePurchase(id) {
    const url = `http://localhost:3000/db/delete-purchase/${id}`;

    try {
        const respuesta = await fetch(url, { method: 'DELETE' });
        if (!respuesta.ok) {
            throw new Error('Error al eliminar la compra');
        }
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar la compra:', error.message);
        return { success: false, message: error.message };
    }
}

/**
 * Agrega una nueva fila a la tabla de transacciones.
 *
 * @param {Object} datos - Datos de la transacción para crear la fila.
 */
function addRowToTable(datos) {
    const cuerpoTabla = document.querySelector('.transactions__table tbody');
    const fila = document.createElement('tr');
    fila.classList.add('transactions__row');

    const clasesCambio24h = datos.change24h < 0 ? 'transactions__cell--change down' : 'transactions__cell--change';
    const clasesPerdidaGanancia = datos.gainLossPercentage < 0 ? 'transactions__cell--change down' : 'transactions__cell--change';

    fila.innerHTML = `
        <td class="transactions__cell">#${datos.id}</td>
        <td class="transactions__cell">${datos.date}</td>
        <td class="transactions__cell transactions__cell--symbol">${datos.symbol}</td>
        <td class="transactions__cell">${datos.company}</td>
        <td class="transactions__cell">${datos.pricePerShare.toFixed(2)}</td>
        <td class="transactions__cell">${datos.shares}</td>
        <td class="transactions__cell">${datos.total.toFixed(2)}</td>
        <td class="${clasesCambio24h}">${datos.change24h}%</td>
        <td class="transactions__cell">${datos.currentPrice.toFixed(2)}</td>
        <td class="${clasesPerdidaGanancia}">${datos.gainLossPercentage.toFixed(2)}%</td>
        <td class="transactions__cell">${datos.gainLossDollar.toFixed(2)}</td>
        <td class="transactions__cell">${datos.totalCurrentValue.toFixed(2)}</td>
        <td class="transactions__cell transactions__cell--action">
            <button class="transactions__delete-btn" id="${datos.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);
}

export { updateTable, deletePurchase, addRowToTable };