const Stock = require('../models/purchaseModel');
const { getStockPrice: fetchStockPrice, getOneSymbolSearch, getStockChange } = require('../api/stockAPI');

/**
 * Obtiene el precio de una acción dado su símbolo.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getStockPrice = async (req, res) => {
    const { symbol } = req.params;
    try {
        const stockPrice = await fetchStockPrice(symbol); // Usar el método importado con un alias
        res.json(stockPrice);
    } catch (error) {
        console.error('Error al obtener el precio de la acción:', error);
        res.status(500).json({ error: 'No se pudo obtener el precio de la acción: ' + error.message });
    }
};

/**
 * Busca un símbolo de acción por su nombre.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const searchSymbolByName = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await getOneSymbolSearch(name);
        res.json(result);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda: ' + error.message });
    }
};

/**
 * Calcula el cambio porcentual de una acción.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const calculateStockChange = async (req, res) => {
    const { symbol } = req.params;

    try {
        const { latestPrice, previousPrice } = await getStockChange(symbol);

        const cambioPortentual = ((latestPrice - previousPrice) / previousPrice) * 100;

        res.json({
            percentageChange: cambioPortentual.toFixed(2),
        });
    } catch (error) {
        console.error('Error al calcular el cambio porcentual:', error);

        res.status(500).json({
            error: 'No se pudo calcular el cambio porcentual',
            detalleError: error.message,
        });
    }
};

module.exports = {
    getStockPrice,
    searchSymbolByName,
    calculateStockChange,
};
