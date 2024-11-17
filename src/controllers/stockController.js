const stockAPI = require('../api/stockAPI');
const Stock = require('../models/stockModel');
const { getStockChange } = require('../api/stockAPI');

const registerPurchase = async (req, res) => {
    const { symbol, quantity, purchasePrice } = req.body;

    try {

        const newPurchase = new Stock({
            symbol,
            quantity,
            purchasePrice,
            date: new Date()
        });

        await newPurchase.save();
        res.status(201).json({ message: 'Compra registrada con éxito', newPurchase });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateStockChange = async (req, res) => {
    const { symbol } = req.params;

    try {
        const { latestPrice, previousPrice } = await getStockChange(symbol);

        const percentageChange = ((latestPrice - previousPrice) / previousPrice) * 100;

        res.json({ percentageChange });
    } catch (error) {
        console.error('Error al calcular el cambio porcentual:', error);
        res.status(500).json({ error: 'No se pudo calcular el cambio porcentual' });
    }
};

module.exports = { registerPurchase, calculateStockChange };