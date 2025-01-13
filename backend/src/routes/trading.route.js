const express = require('express');
const router = express.Router();
const {
    createPurchase,
    getAllPurchases
} = require('../controllers/trading.controller');

// Nombres de rutas en kebab-case según el estándar
router.post('/create-purchase', createPurchase); // /db/purchase
router.get('/get-purchases', getAllPurchases); // /db/purchases

module.exports = router;
