
const Purchase = require('../models/purchase');
const Product = require('../models/product');
const Account = require('../models/account');
const UserController = require('./user');

module.exports = {

    /**
     * Returns a list of all the purchases
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getPurchases(request, response) {
        console.log('GET /purchases');
        const acceptedRoles = ['admin', 'shopkeeper'];
        UserController.authenticate(request, response, acceptedRoles)
        .then(async function(error, user) {
            if (error) {
                console.log("Get purchases: " + error + "\n");
                response.sendStatus(400);
            } else {
                try {
                    const purchases = await Purchase.find().exec();
    
                    if(!purchases) {
                        console.log("Could not get purchases\n");
                        response.sendStatus(400);
                    }
                    else {
                        console.log("Purchases successfully retrieved\n");
                        response.json(purchases);
                    }
                }
                catch(error) {
                    console.log("Could not get purchases");
                    console.log(`CAUGHT AN ERROR: ${error}\n`);
                    response.sendStatus(400);
                }
            }        
        });
    },

    /**
     * Returns a list of all the purchases by one user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getOwnPurchases(request, response) {
        console.log('GET /purchases/myPurchases');
        const acceptedRoles = ['user'];
        UserController.authenticate(request, response, acceptedRoles)
        .then(async function(error, user) {
            if (error) {
                console.log("Get purchases: " + error + "\n");
                response.sendStatus(400);
            } else {
                try {
                    const purchases = await Purchase.find({buyerID: user._id});
    
                    if(!purchases) {
                        console.log("Could not get purchases\n");
                        response.sendStatus(400);
                    }
                    else {
                        console.log("Purchases successfully retrieved\n");
                        response.json(purchases);
                    }
                }
                catch(error) {
                    console.log("Could not get purchases");
                    console.log(`CAUGHT AN ERROR: ${error}\n`);
                    response.sendStatus(400);
                }
            }        
        });
    },

    /**
     * Adds a new purchase
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async addPurchase(request, response, product) {
        console.log('POST /purchases');
        const acceptedRoles = ['user'];
        UserController.authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if (!user) {
                console.log("Add purchase failed: " + error + "\n");
            }
            else {
                try {
                    //console.log(user._id);
                    
                    Account.findOne({ ownerID: user._id }).then(async function(account) {
                        //console.log(account);
                        // const id = product.id;
                        // user.creditCard = account.creditCard;
                        // user.accountNumber = account.accountNumber;
                        // if(user.creditCard === undefined) {
                        //     user.creditCard = "0000000000000000";
                        // }

                        if(!account) {
                            console.log(`Could not find account of user: ${user._id}\n`);
                            throw Error();
                        }
                        
                        else if(!product) {
                            console.log(`Could not get the product to purchase: ${product.id}\n`);
                            throw Error();
                        }
                        else {
                            console.log(`Successfully retrieved the product to purchase: ${product.id}\n`);
                            try {                
                                const credit4last = account.creditCard.slice(account.creditCard.length - 4);
                                let newPurchase = new Purchase({
                                    buyerID: user._id,
                                    buyerCredit4last: credit4last,
                                    productName: product.name,
                                    ownerID: product.ownerID,
                                    purchasePrice: product.purchasePrice,
                                    sellingPrice: product.sellingPrice,
                                    date: new Date()
                                });
                        
                                await newPurchase.save(async function(error) {
                                    if (error) {
                                        throw Error(error);
                                    }

                                    if(account.balance !== undefined) {
                                        const changedAccount = new Account(account);
                                        changedAccount.balance = account.balance - product.sellingPrice;
                                        await changedAccount.save();
                                    }

                                    return;
                                });
                            }
                            catch(error) {
                                console.log(`Could not get the product to purchase: ${product.id}\n`);
                                throw Error(error);
                            }
                        }
                    });
                } catch(error) {
                    console.log(error);
                    return Error(error);
                }
            }
        });
        
    }
    
};