
const Product = require('../models/product');
const Account = require('../models/account')
const UserController = require('./user');
const PurchaseController = require('./purchase');
const path = 'http://localhost:3000/'


module.exports = {

    /**
     * Returns a list of all the products
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getProducts(request, response) {
        console.log('GET /products');

        try {
            const products = await Product.find({ accepted: true }).exec();

            if (!products) {
                console.log("Could not get products\n");
                response.sendStatus(400);
            }
            else {
                console.log("Products successfully retrieved\n");
                response.json(products);
            }
        }
        catch (error) {
            console.log("Could not get products");
            console.log(`CAUGHT AN ERROR: ${error}\n`);
            response.sendStatus(400);
        }
    },

    /**
     * Returns a list of all the products that are waiting for approval
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getPendingProducts(request, response) {
        console.log('GET /products/pending');
        const acceptedRoles = ['admin', 'shopkeeper'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user) {
                if (!user) {
                    console.log("Retrieving pending products failed\n");
                    response.sendStatus(400);
                } else {
                    try {
                        const products = await Product.find({ accepted: false }).exec();

                        if (!products) {
                            console.log("Could not get products\n");
                            response.sendStatus(400);
                        }
                        else {
                            console.log("Pending products successfully retrieved by: " + user.role + "\n");
                            response.json(products);
                        }
                    }
                    catch (error) {
                        console.log("Could not get products");
                        console.log(`CAUGHT AN ERROR: ${error}\n`);
                        response.sendStatus(400);
                    }
                }
            });
    },

        /**
     * Returns a list of all the products that are waiting for approval
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getOwnPendingProducts(request, response) {
        console.log('GET /products/my');
        const acceptedRoles = ['user', 'admin', 'shopkeeper'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user) {
                if (!user) {
                    console.log("Retrieving pending products failed\n");
                    response.sendStatus(400);
                } else {
                    try {
                        const products = await Product.find({ ownerID: user._id, accepted: false }).exec();

                        if (!products) {
                            console.log("Could not get products\n");
                            response.sendStatus(400);
                        }
                        else {
                            console.log("Own pending products successfully retrieved by: " + user.role + "\n");
                            response.json(products);
                        }
                    }
                    catch (error) {
                        console.log("Could not get own pending products");
                        console.log(`CAUGHT AN ERROR: ${error}\n`);
                        response.sendStatus(400);
                    }
                }
            });
    },

       /**
     * Returns a list of all the products that are on sale
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getOwnProductsOnSale(request, response) {
        console.log('GET /products/onsale');
        const acceptedRoles = ['shopkeeper', 'admin'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user) {
                if (!user) {
                    console.log("Retrieving products on sale failed\n");
                    response.sendStatus(400);
                } else {
                    try {
                        const products = await Product.find({ ownerID: user._id, accepted: true }).exec();

                        if (!products) {
                            console.log("Could not get products\n");
                            response.sendStatus(400);
                        }
                        else {
                            console.log("Own products on sale successfully retrieved by: " + user.role + "\n");
                            response.json(products);
                        }
                    }
                    catch (error) {
                        console.log("Could not get own products on sale");
                        console.log(`CAUGHT AN ERROR: ${error}\n`);
                        response.sendStatus(400);
                    }
                }
            });
    },

    /**
     * Adds a new product
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async addProduct(request, response) {
        console.log('POST /products');
        const acceptedRoles = ['user'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user, error) {
                if (error) {
                    console.log("Add product failed: " + error + "\n");
                    response.sendStatus(400);
                }
                else {
                    let newProduct = new Product({
                        name: request.body.name,
                        description: request.body.description,
                        purchasePrice: request.body.purchasePrice,
                        accepted: false,
                        ownerID: user._id
                    });

                    await newProduct.save(function (error) {
                        if (error) {
                            throw error;
                        }
                        console.log(`Successfully added product: ${newProduct.name}\n`);
                        response.json(newProduct);
                    });
                }
            });

    },

    /**
     * Returns information of a product
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getProduct(request, response) {
        console.log(`GET /products/:id`);

        try {
            if(request.params.id === undefined) {
                console.log(`Could not get the product: Faulty ID`);
                response.sendStatus(400);
                return;
            }
            const id = request.params.id;
            const product = await Product.findById(id).exec();

            if (!product) {
                console.log(`Could not get the product: ${id}\n`);
                response.sendStatus(400);
            }
            else {
                console.log(`Successfully retrieved the product: ${id}\n`);
                response.json(product);
            }
        }
        catch (error) {
            console.log(`Could not get the product`);
            console.log(`CAUGHT AN ERROR: ${error}\n`);
            response.sendStatus(400);
        }
    },

    /**
     * Updates a product
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async updateProduct(request, response) {
        console.log('PUT /products/:id');
        const acceptedRoles = ['admin', 'shopkeeper'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user, error) {
                //response.end();
                if (error) {
                    console.log("Product update failed: " + error + "\n");
                    response.sendStatus(400);
                }
                else {
                    Product.findByIdAndUpdate(request.params.id, request.body, { 'new': true }, function (err, product) {
                        if (err) { response.sendStatus(400); return console.error(err); };
                        if (!product) { response.sendStatus(404) } else {
                            response.set('Location', path + 'api/products/' + product._id);
                            response.status(200);
                            console.log("Product updated by " + user.role + "\n");
                            console.log(request.body.accepted);
                            if (request.body.accepted == 'true' && product.purchasePrice < 0) {
                                Account.findOne({ownerID: product.ownerID}).exec(function (err, account) {
                                    const oldBalance = parseInt(account.balance);
                                    const newBalance = oldBalance + parseInt(product.purchasePrice);
                                    account.balance = newBalance;
                                    account.save();
                                });
                                
                            }
                            response.json(product);
                        }
                    });
                }
            });
    },

    /**
     * Removes a product
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async removeProduct(request, response) {
        console.log('DELETE /products/:id');
        const acceptedRoles = ['admin', 'shopkeeper'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user, error) {

                if (error) {
                    console.log("Product removal failed: " + error + "\n");
                    response.sendStatus(400);
                } else {
                    Product.findByIdAndDelete(request.params.id, function (err, product) {
                        if (err) { res.sendStatus(404); return console.error(err); };
                        if (!product) { response.sendStatus(404) } else {
                            response.set('Location', path + 'api/products/' + product._id);
                            response.status(204);
                            console.log("Product removed by " + user.role + "\n");
                            response.json(product);
                        }
                    });
                }
            });
    },

    /**
     * Buys a product
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async buyProduct(request, response) {
        console.log('POST /products/buy/:id');
        const acceptedRoles = ['user'];
        UserController.authenticate(request, response, acceptedRoles)
            .then(async function (user) {
                try {
                    Product.findById(request.body.id, function (error, product) {
                        if (error) {
                            res.sendStatus(500);
                            return console.error(err);
                        }
                        if (!product) {
                            response.sendStatus(500);
                        } else {
                            Account.findOne({ownerID:user._id}, function (err, account) {
                                if (!account) {
                                    response.sendStatus(400);
                                    console.log("Bank account not found");
                                }
                                
                                else if (parseInt(product.sellingPrice) > parseInt(account.balance)) {
                                    response.sendStatus(402);
                                    console.log("Not enough balance on account")
                                }
                                else {
                                    const purchasePromise = PurchaseController.addPurchase(request, response, product);
                                    purchasePromise.then((msg) => {
                                        
                                        console.log("Product bought by " + user.name);                             
                                    });
                                    Product.findByIdAndDelete(request.body.id, function (error, product) {
                                        if (error) {
                                            res.sendStatus(500);
                                            return console.error(err);
                                        }
                                        else {
                                            console.log("Product removed from database");
                                            response.status(200);
                                            response.json(product.name);
                                        }
                                    });
                                }
                            });

                        }
                        
                    });
                }
                catch (error) {
                    console.log("Could not buy product");
                    console.log(error);
                    response.status(500);
                }
            });
    }

};
