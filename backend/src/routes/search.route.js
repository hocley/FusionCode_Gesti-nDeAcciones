const express = require('express');
const router = express.Router();
const SearchPanelController = require('../controllers/search.controller'); // Asegúrate de que el path sea correcto

// Ruta para buscar información de acciones
router.get('/stock-info/:name', SearchPanelController.getStockInfo);

module.exports = router;
