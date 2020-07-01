const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/purchase');

router
    .route('/')
    .get(PurchaseController.getPurchases)
    .post(PurchaseController.addPurchase);

router
    .route('/myPurchases')
    .get(PurchaseController.getOwnPurchases)


module.exports = router;