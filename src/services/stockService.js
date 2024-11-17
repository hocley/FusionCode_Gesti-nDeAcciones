const Stock = require('../models/purchaseModel');

// Insertar datos en la base de datos
const createStock = async (stockData) => {
    try {
        const stock = new Stock(stockData);
        await stock.save();
        return stock;
    } catch (error) {
        console.error('Error al insertar la acción:', error);
        throw new Error('Error al insertar la acción');
    }
};

// Leer todas las acciones
const getStocks = async () => {
    try {
        const stocks = await Stock.find();
        return stocks;
    } catch (error) {
        console.error('Error al obtener las acciones:', error);
        throw new Error('Error al obtener las acciones');
    }
};

module.exports = { createStock, getStocks };
