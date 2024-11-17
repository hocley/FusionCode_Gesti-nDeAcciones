const stockAPI = require('../api/stockAPI');
const Stock = require('../models/stockModel');

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

module.exports = { registerPurchase, getStockChangePercentage  };
