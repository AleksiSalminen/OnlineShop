const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router
    .route('/')
    .get(ProductController.getProducts)
    .post(ProductController.addProduct);

router
    .route('/pending')
    .get(ProductController.getPendingProducts);

router
    .route('/my')
    .get(ProductController.getOwnPendingProducts);

router
    .route('/onsale')
    .get(ProductController.getOwnProductsOnSale);

router
    .route('/:id')
    .get(ProductController.getProduct)
    .post(ProductController.buyProduct)
    .put(ProductController.updateProduct)
    .delete(ProductController.removeProduct);

router
    .route('/buy/:id')
    .post(ProductController.buyProduct);

module.exports = router;
