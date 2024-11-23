const express = require('express');
const router = express.Router();
const {
    createPurchase,
    getAllPurchases,
    deletePurchase
} = require('../controllers/purchaseController');

// Cambiar el prefijo de '/api' a '/db'
router.post('/create-purchase', createPurchase); // /db/purchase
router.get('/get-purchases', getAllPurchases); // /db/purchases
router.delete('/delete-purchase/:purchaseId', deletePurchase); // /db/purchase/:purchaseId

module.exports = router;
