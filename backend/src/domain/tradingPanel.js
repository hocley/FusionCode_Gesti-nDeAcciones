/**
 * Realiza una compra de acciones, enviando los datos al servidor.
 *
 * @param {string} simboloAccion - Símbolo de cotización de la acción.
 * @param {string} nombreEmpresa - Nombre de la empresa.
 * @param {number} precioPorAccion - Precio de cada acción.
 * @param {number} cantidadAcciones - Número de acciones a comprar.
 * @returns {Promise<Object>} Resultado de la operación de compra.
 */
async function attemptPurchase(simboloAccion, nombreEmpresa, precioPorAccion, cantidadAcciones) {
    // Calcular el valor total de la compra
    const valorTotal = precioPorAccion * cantidadAcciones;

    // Preparar datos para enviar al servidor
    const datosCompra = {
        symbol: simboloAccion,
        companyName: nombreEmpresa,
        stockPrice: precioPorAccion,
        numOfShares: cantidadAcciones,
        totalValue: valorTotal
    };

    try {
        // Enviar solicitud de compra al servidor
        const respuesta = await fetch('http://localhost:3000/db/create-purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosCompra)
        });

        // Verificar si la respuesta del servidor es válida
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        // Retornar resultado exitoso
        return {
            success: true,
            message: 'Compra realizada con éxito'
        };
    } catch (error) {
        // Manejar errores de la solicitud
        return {
            success: false,
            message: `Error al realizar la compra: ${error.message}`
        };
    }
}

/**
 * Elimina una compra del sistema por su ID.
 *
 * @param {number} id - Identificador de la compra a eliminar.
 * @returns {Promise<{success: boolean}>}
 */

export { attemptPurchase};