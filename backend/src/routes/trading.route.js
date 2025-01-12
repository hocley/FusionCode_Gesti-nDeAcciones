const express = require('express');
const router = express.Router();
const {
    createPurchase,
    getAllPurchases,
    deletePurchase
} = require('../controllers/trading.controller');

// Nombres de rutas en kebab-case según el estándar
router.post('/create-purchase', createPurchase); // /db/purchase
router.get('/get-purchases', getAllPurchases); // /db/purchases
router.delete('/delete-purchase/:purchaseId', deletePurchase); // /db/purchase/:purchaseId

module.exports = router;
