const express = require('express');
const router = express.Router();
const { getStockPrice, getSymbolSearch, getOneSymbolSearch } = require('../api/stockAPI');
const StockController = require('../controllers/stockController'); // Asegúrate de que el path es correcto

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

router.get('/search-name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const result = await getOneSymbolSearch(name);
        res.json(result);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
});

router.get('/stock-change/:symbol', StockController.calculateStockChange);

module.exports = router;