const express = require('express');
const router = express.Router();
const StockController = require('../controllers/recentTransaction.controller'); // Asegúrate de que el path es correcto

// Rutas relacionadas con las acciones
router.get('/stock/:symbol', StockController.getStockPrice);
router.get('/search-name/:name', StockController.searchSymbolByName);
router.get('/stock-change/:symbol', StockController.calculateStockChange);

module.exports = router;
