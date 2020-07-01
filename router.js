// Load routers
const UsersRouter = require('./routes/users');
const ProductsRouter = require('./routes/products');
const PurchasesRouter = require('./routes/purchases');
const express = require('express');

// Setup api router
let api = express.Router();
api.use('/users', UsersRouter);
api.use('/products', ProductsRouter);
api.use('/purchases', PurchasesRouter);

// Setup Routes
module.exports = function(app) {
    app.use('/api' , api);
    app.use('/', express.static('public'));
};
