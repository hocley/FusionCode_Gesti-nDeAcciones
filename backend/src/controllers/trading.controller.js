const Purchase = require('../models/purchaseModel');
const crypto = require('crypto');

/**
 * Genera un ID único hexadecimal de 6 caracteres
 * @returns {string} ID único en mayúsculas
 */
const generateUniqueId = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

/**
 * Crea un nuevo registro de compra de acciones
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Datos de la compra
 * @param {string} req.body.symbol - Símbolo de la acción
 * @param {string} req.body.companyName - Nombre de la empresa
 * @param {number} req.body.stockPrice - Precio de la acción
 * @param {number} req.body.numOfShares - Número de acciones compradas
 * @param {number} req.body.totalValue - Valor total de la compra
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */
const createPurchase = async (req, res) => {
    try {
        const {
            symbol,
            companyName,
            stockPrice,
            numOfShares,
            totalValue
        } = req.body;

        const purchaseData = {
            purchaseId: generateUniqueId(),
            date: new Date().toISOString().split('T')[0],
            symbol,
            companyName,
            stockPrice,
            numOfShares,
            totalValue
        };

        const newPurchase = new Purchase(purchaseData);
        const savedPurchase = await newPurchase.save();

        res.status(201).json(savedPurchase);
    } catch (error) {
        console.error('Error al crear la compra:', error);
        res.status(500).json({
            message: 'Error al crear la compra',
            error: error.message
        });
    }
};

/**
 * Obtiene todas las compras registradas
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */
const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error.message);
        res.status(500).json({
            message: 'Error al obtener las compras',
            error: error.message
        });
    }
};

/**
 * Elimina una compra por su ID único
 * @param {Object} req - Request de Express
 * @param {Object} req.params - Parámetros de la petición
 * @param {string} req.params.purchaseId - ID único de la compra a eliminar
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */
const deletePurchase = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        const deletedPurchase = await Purchase.findOneAndDelete({ purchaseId });

        if (!deletedPurchase) {
            return res.status(404).json({
                message: 'Compra no encontrada'
            });
        }

        res.status(200).json({
            message: 'Compra eliminada con éxito',
            purchase: deletedPurchase
        });
    } catch (error) {
        console.error('Error al eliminar la compra:', error.message);
        res.status(500).json({
            message: 'Error al eliminar la compra',
            error: error.message
        });
    }
};

module.exports = {
    createPurchase,
    getAllPurchases,
    deletePurchase
};