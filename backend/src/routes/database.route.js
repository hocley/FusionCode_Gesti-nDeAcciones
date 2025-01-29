const express = require('express');
const router = express.Router();
const {
    createPurchase,
    getAllPurchases
} = require('../controllers/trading.controller');
const {getSymbols, getPurchasesByName} = require('../controllers/consolidation.controller');

router.post('/create-purchase', createPurchase); // /db/purchase
router.get('/get-purchases', getAllPurchases); // /db/purchases
router.get('/get-symbols', getSymbols); // /db/purchases/:id
router.get('/get-purchases-name/:company', getPurchasesByName); // /db/purchases/:id

module.exports = router;
