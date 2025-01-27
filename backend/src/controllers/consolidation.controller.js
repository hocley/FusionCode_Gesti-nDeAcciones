const Purchase = require('../models/purchaseModel');

/**
 * Obtiene los símbolos únicos de todas las compras
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */
const getSymbols = async (req, res) => {
    try {
        // Obtiene los símbolos únicos de todas las compras en la colección
        const symbols = await Purchase.distinct('companyName');

        if (!symbols || symbols.length === 0) {
            return res.status(404).json({
                message: 'No existe ningún registro'
            });
        }
        res.status(200).json(symbols);
    } catch (error) {
        console.error('Error al obtener los símbolos:', error.message);
        res.status(500).json({
            message: 'Error al obtener los símbolos:' + error.message,
        });
    }
};

/**
 * Obtiene las compras hechas a una compañía específica
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */

const getPurchasesByName = async (req, res) => {
    const { company } = req.params; // Obtiene el parámetro de la URL
    console.log('Compañía:', company);

    try {
        const purchases = await Purchase.find({ companyName: company });

        if (!purchases || purchases.length === 0) {
            return res.status(404).json({
                message: `No se encontraron compras para ${company}`
            });
        }
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error.message);
        res.status(500).json({
            message: 'Error al obtener las compras:' + error.message,
        });
    }
};


module.exports = {
    getSymbols,
    getPurchasesByName
};