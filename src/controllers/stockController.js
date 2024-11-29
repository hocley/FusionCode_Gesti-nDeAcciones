const Stock = require('../models/purchaseModel');
const { getStockChange } = require('../api/stockAPI');

/**
 * Registra una nueva compra de acciones en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const registerPurchase = async (req, res) => {
    const { symbol, quantity, purchasePrice } = req.body;

    try {
        const compraActual = new Stock({
            symbol,
            quantity,
            purchasePrice,
            date: new Date()
        });

        await compraActual.save();

        res.status(201).json({
            message: 'Compra registrada con éxito',
            newPurchase: compraActual
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar la compra',
            detalleError: error.message
        });
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
            percentageChange: cambioPortentual.toFixed(2)
        });
    } catch (error) {
        console.error('Error al calcular el cambio porcentual:', error);

        res.status(500).json({
            error: 'No se pudo calcular el cambio porcentual',
            detalleError: error.message
        });
    }
};

module.exports = { registerPurchase, calculateStockChange };