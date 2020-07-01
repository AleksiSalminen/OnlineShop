
require('dotenv').config();
let express = require('express');
let app = express();
let helmet = require('helmet');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

const User = require('./models/user');
const Product = require('./models/product');
const Account = require('./models/account');
const Purchase = require('./models/purchase');


const port = 3000;

app.use(helmet());
app.use(bodyParser.json());

/* Connect to MongoDB */
mongoose.connect('mongodb://localhost/WWWProgramming', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


/* Delete users (if you want to) */

// User.deleteMany({}).then(function(error) {
//     console.log("Deleted users");
// });

/* Delete accounts (if you want to) */

// Account.deleteMany({}).then(function(error) {
//     console.log("Deleted accounts");
// });

/* Delete products (if you want to) */

// Product.deleteMany({}).then(function(error) {
//     console.log("Deleted products");
// });

/* Delete purhcases (if you want to) */

// Purchase.deleteMany({}).then(function(error) {
//     console.log("Deleted purchases");
// });


/* Setup users */
require('./setup/createusers')().then(() => {});

/* Add a couple products */
require('./setup/createproducts')().then(() => {});

/* Set up routers */
require('./router.js')(app);

app.listen(port, () => console.log(`App listening on port ${port}\n`));
