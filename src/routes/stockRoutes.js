const express = require('express');
const { getStockPrice, getSymbolSearch, getStockChange } = require('../api/stockAPI');
const router = express.Router();

router.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const stockPrice = await getStockPrice(symbol);
        res.json(stockPrice);
    } catch (error) {
        console.error('Error al obtener el precio de la acción:', error);
        res.status(500).json({ error: 'No se pudo obtener el precio de la acción' + error});
    }
});

router.get('/search/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const result = await getSymbolSearch(name);
        res.json(result);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
});

router.get('/stock-change/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const stockChange = await getStockChange(symbol);
        res.json(stockChange);
    } catch (error) {
        console.error('Error al obtener el cambio porcentual:', error);
        res.status(500).json({ error: 'No se pudo obtener el cambio porcentual' });
    }
});

module.exports = router;