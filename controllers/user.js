const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Account = require('../models/account');


const secret = "No one is going to guess this one...";
const saltRounds = 12;
const path = 'http://localhost:3000/';

/**
 * Create a new JSON web token and return it
 */
function createToken(email) {
    let token = jwt.sign({ email: email }, secret, { algorithm: 'HS256' });
    if(token === undefined) {
        console.log("Token creation failed");
        return null;
    }
    console.log("Token successfully created: " + token);
    return token;
}

/**
* Authenticate the user
* @param {Object} request is express request object
* @param {Object} response is express response object
*/
async function authenticate(request, response, acceptedRoles) {
    if(request.headers.authorization) {
        if(request.headers.authorization.startsWith('Bearer ')) {
            let token = request.headers.authorization.slice(7, request.headers.authorization.length);
            const decoded = jwt.verify(token, secret);
            const user = await User.findOne({
                'email': decoded.email
            });

            if(!user) {
                console.log("Authentication failed: Faulty token");
                response.sendStatus(401);
            }
            else {
                console.log("Authentication successful");
                try {
                    roleOK = checkRole(user, acceptedRoles)
                    if (roleOK) {
                        console.log("Role check OK");
                        return user;
                    } else {
                        console.log("Authentication failed. Unauthorized role.\n");
                        response.sendStatus(401);
                    }
                    
                } catch(error) {
                    console.log("Authentication failed: " + error +"\n");
                    response.sendStatus(500);
                }
                                    
            }
        } else {
            console.log("Authentication failed: Faulty headers");
            response.sendStatus(401);
        }
    } else {
        console.log("Authentication failed: Authorization headers missing");
        response.sendStatus(401);
    }
}

async function checkRole(user, acceptedRoles) {
    try {
        const role = user.role;
        let roleOK = false;
        acceptedRoles.forEach(element => {
            if (element === role) {
                roleOK = true;
            }
        });
        return roleOK;
    }
    catch(error) {
        console.log("Role check failed\n");
        console.log(error);
        return false;
    }
}


module.exports = {

    /**
     * Log in the user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async login(request, response) {
        console.log('POST /users/login');
        
        try {
            const email = request.body.email;
            const password = request.body.password;

            User.findOne({
                'email': email
            }, 
            function(error, user) {
                if(error) {
                    throw error;
                }
                else if(user) {
                    bcrypt.compare(password, user.password, function(error, result) {
                        if(error) {
                            throw error;
                        }
                        else if(result) {
                            const token = createToken(user.email);
                            console.log(`Successfully logged in the user: ${user.name}\n`);
                            response.json({ token: token, role: user.role });
                        } 
                        else {
                            console.log("Login failed: Wrong password\n");
                            response.sendStatus(401);
                        }
                    });
                }
                else {
                    console.log("Login failed: User not found\n");
                    response.sendStatus(401);
                }
              })
        }
        catch(error) {
            console.log("Login failed");
            console.log(`CAUGHT AN ERROR: ${error}\n`);
            response.sendStatus(400);
        }
    },

    /**
     * Register a new user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async register(request, response) {
        console.log('POST /users/register');

        try {
            bcrypt.hash(request.body.password, saltRounds, function(error, hash) {
                if(error) {
                    throw error;
                }

                let newUser = new User({
                    email: request.body.email,
                    name: request.body.name,
                    password: hash,
                    role: 'user'
                });

                newUser.save(function(error) {
                    if (error) {
                        throw error;
                    }
                    
                    console.log(`Successfully registered a new user: ${newUser.name}\n`);
                    //console.log(JSON.stringify(token));
                    
                });

                // Random amount of account balance (between 50 and 1000)
                const balance = Math.floor(Math.random() * (1000 - 50 + 1)) + 50;

                let newAccount = new Account({
                    creditCard: request.body.creditCard,
                    accountNumber: request.body.accountNumber,
                    balance: balance,
                    ownerID: newUser._id
                });

                newAccount.save(function(error) {
                    if (error) {
                        throw error;
                    }
                    console.log(`Successfully created bank account data for user: ${newUser.name}\n`);
                });
                const token = createToken(newUser.email);
                response.json({ token: token, role: newUser.role });
                
            });
        }
        catch(error) {
            console.log("Registration failed");
            console.log(`CAUGHT AN ERROR: ${error}\n`);
            response.sendStatus(400);
        }
    },

    /**
     * Gets all user's information
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getUsers(request, response) {
        console.log('GET /users');
        const acceptedRoles = ['admin'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if (!user) {
                console.log("Retrieving users failed\n");
                response.sendStatus(400);
            }
            else {
                try {
                    const users = await User.find().exec();
        
                    if(!users) {
                        console.log("Could not get users\n");
                        response.sendStatus(400);
                    }
                    else {
                        console.log("Users successfully retrieved by " + user.role + "\n");
                        response.json(users);
                    }
                }
                catch(error) {
                    console.log("Could not get users");
                    console.log(`CAUGHT AN ERROR: ${error}\n`);
                    response.sendStatus(400);
                }
            }
        });
    },

    /**
     * Gets the user's own information
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async getOwnInfo(request, response) {
        console.log('GET /users/me');
        const acceptedRoles = ['user', 'shopkeeper', 'admin'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if (!user) {
                console.log("Retrieving user's own info failed\n");
                response.sendStatus(400);
            }
            else {
                try {
                    const account = await Account.findOne({ownerID: user._id}).exec();
        
                    if(user.role !== 'admin' && !account) {
                        console.log("Could not get the user's own info\n");
                        response.sendStatus(400);
                    }
                    else if(user.role !== 'admin') {
                        const usr = JSON.parse(JSON.stringify(user));
                        usr.creditCard = account.creditCard;
                        usr.accountNumber = account.accountNumber;

                        console.log("User's own info successfully retrieved\n");
                        response.json(usr);
                    }
                    else {
                        console.log("User's own info successfully retrieved\n");
                        response.json(user);
                    }
                }
                catch(error) {
                    console.log("Could not get the user's own info");
                    console.log(`CAUGHT AN ERROR: ${error}\n`);
                    response.sendStatus(400);
                }
            }
        });
    },

    /**
     * Updates user's own information
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async updateOwnInfo(request, response) {
        console.log('PUT /users/me');
        const acceptedRoles = ['user', 'admin', 'shopkeeper'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if(!user) {
                console.log("User's own info update failed\n");
                response.sendStatus(400);
            }
            else {
                try {
                    bcrypt.hash(request.body.password, saltRounds, async function(error, hash) {
                        if(error) {
                            throw Error(error);
                        }

                        request.body.password = hash;

                        const account = await Account.findOne({ownerID: user._id}).exec();
                        const accountID = account._id;
                        
                        User.findByIdAndUpdate(user._id, request.body, {'new':true}, function(error, user) {
                            if(error) {
                                response.sendStatus(400);
                                console.log("User's own info update failed");
                                console.log("Caught an error: " + error + "\n");
                            }
                            else if(!user) {
                                response.sendStatus(404);
                                console.log("User's own info update failed\n");
                            } 
                            else {
                                Account.findByIdAndUpdate(accountID, request.body, {'new':true}, function(error, account) {
                                    if(error) {
                                        response.sendStatus(500);
                                        console.log("User's own info update failed\n");
                                    }
                                    else {
                                        const token = createToken(user.email);
                                        let usr = JSON.parse(JSON.stringify(user));
                                        usr.token = token;
                                        usr.creditCard = account.creditCard;
                                        usr.accountNumber = account.accountNumber;
                                        response.json(usr);
                                        console.log("Successfully updated user's own info\n");
                                    }
                                });
                            }
                        });
                    });
                }
                catch(error) {
                    response.sendStatus(500);
                    console.log("User's own info update failed");
                    console.log("Caught an error: " + error + "\n");
                }
            }
        });
    },

    /**
     * Unregisters the user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async unregister(request, response) {
        console.log('DELETE /users/me');
        const acceptedRoles = ['user', 'shopkeeper', 'admin'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if(!user) {
                console.log("Unregistering failed\n");
                response.sendStatus(400);
            }
            else {
                const id = user.id;
                User.findByIdAndDelete(id, (error, data) => {
                    if(error) {
                        console.log("Unregistering failed\n");
                        console.log(error);
                        response.sendStatus(500);
                    }
                    else {
                        console.log("Successfully unregistered\n");
                        response.json(data);
                    }
                });
            }
        });
    },

    /**
     * Updates user's information
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async updateUser(request, response) {
        console.log('PUT /users/:id');
        const acceptedRoles = ['admin'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if(!user) {
                console.log("User update failed\n");
                response.sendStatus(400);
            }
            else {
                User.findByIdAndUpdate(request.body.id, request.body, {'new':true}, function() {
                    console.log("Successfully updated user\n");
                    response.json(user);
                });
            }
        });
    },

    /**
     * Deletes a user
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async deleteUser(request, response) {
        console.log('DELETE /users/:id');
        const acceptedRoles = ['admin'];
        authenticate(request, response, acceptedRoles)
        .then(async function(user) {
            if(!user) {
                console.log("Deleting user failed\n");
                response.sendStatus(400);
            }
            else {
                const id = request.body.id;
                User.findByIdAndDelete(id, (error, data) => {
                    if(error) {
                        console.log("Deleting user failed\n");
                        console.log(error);
                        response.sendStatus(500);
                    }
                    else {
                        console.log("Successfully deleted a user\n");
                        response.json(data);
                    }
                });
            }
        });
    },

    authenticate

};
