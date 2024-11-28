const Purchase = require('../models/purchaseModel');
const crypto = require('crypto');

const generateUniqueId = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // 3 bytes son 6 caracteres hexadecimales
};

// Función para crear una nueva compra
const createPurchase = async (req, res) => {
    try {
        const { symbol, companyName, stockPrice, numOfShares, totalValue } = req.body;

        // Generar el ID único de compra
        const purchaseId = generateUniqueId();
        const date = new Date().toISOString().split('T')[0];
        const newPurchase = new Purchase({
            purchaseId,
            date,
            symbol,
            companyName,
            stockPrice,
            numOfShares,
            totalValue
        });

        const savedPurchase = await newPurchase.save();

        res.status(201).json(savedPurchase);
    } catch (error) {
        console.error('Error al crear la compra:', error);
        res.status(500).json({ message: 'Error al crear la compra', error });
    }
};

// Función para obtener todas las compras
const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error.message);
        res.status(500).json({ message: 'Error al obtener las compras', error: error.message });
    }
};

// Función para eliminar una compra por su ID único
const deletePurchase = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        const deletedPurchase = await Purchase.findOneAndDelete({ purchaseId });

        if (!deletedPurchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        res.status(200).json({ message: 'Compra eliminada con éxito', purchase: deletedPurchase });
    } catch (error) {
        console.error('Error al eliminar la compra:', error.message);
        res.status(500).json({ message: 'Error al eliminar la compra', error: error.message });
    }
};

module.exports = {
    createPurchase,
    getAllPurchases,
    deletePurchase
};