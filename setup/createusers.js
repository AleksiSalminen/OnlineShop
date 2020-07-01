
module.exports = async userConfig => {

  const bcrypt = require('bcryptjs');
  const saltRounds = 12;

  const User = require('../models/user');
  const Account = require('../models/account')

  /*
  * Setup admin
  */

  const admin = await User.findOne({ role: 'admin' }).exec();

  if (admin) {
    console.log('Admin user not created: Already exists in the database');
  }
  else {
    bcrypt.hash(process.env.ADMIN_PASS, saltRounds, async function (error, hash) {
      let userJSON = {};
      userJSON["name"] = process.env.ADMIN_NAME;
      userJSON["email"] = process.env.ADMIN_EMAIL;
      userJSON["password"] = hash;

      const user = new User(userJSON);

      const found = await User.findOne({ email: user.email }).exec();

      if (found == null) {
        user.role = 'admin';
        await user.save();
        console.log('Admin user successfully created');
      }
      else {
        console.log('Admin user not created: Duplicate email in the database');
      }
    });
  }


  /*
  * Setup shopkeeper
  */

  const shopkeeper = await User.findOne({ role: 'shopkeeper' }).exec();

  if (shopkeeper) {
    console.log('Shopkeeper user not created: Already exists in the database');
  }
  else {
    bcrypt.hash(process.env.SHOPKEEPER_PASS, saltRounds, async function (error, hash) {
      let userJSON = {};
      userJSON["name"] = process.env.SHOPKEEPER_NAME;
      userJSON["email"] = process.env.SHOPKEEPER_EMAIL;
      userJSON["password"] = hash;

      let accountJSON = {};
      accountJSON["creditCard"] = process.env.SHOPKEEPER_CARD;
      accountJSON["accountNumber"] = process.env.SHOPKEEPER_ACCOUNT;

      const user = new User(userJSON);

      const found = await User.findOne({ email: user.email }).exec();

      if (found == null) {
        user.role = 'shopkeeper';
        await user.save();
        const newUser = await User.findOne({ email: user.email }).exec();
        accountJSON["ownerID"] = newUser._id;
        accountJSON["balance"] = 500;
        const account = new Account(accountJSON);
        await account.save();
        console.log('Shopkeeper user successfully created');
      }

      if (found == null) {
        
        
        
      }
      else {
        console.log('Shopkeeper user not created: Duplicate email in the database');
      }
    });
  }


  /*
  * Setup regular user
  */

  const user = await User.findOne({ role: 'user' }).exec();

  if (user) {
    console.log('Regular user not created: Already exists in the database');
  }
  else {
    bcrypt.hash(process.env.USER_PASS, saltRounds, async function (error, hash) {
      let userJSON = {};
      userJSON["name"] = process.env.USER_NAME;
      userJSON["email"] = process.env.USER_EMAIL;
      userJSON["password"] = hash;
      
      let accountJSON = {};
      accountJSON["creditCard"] = process.env.USER_CARD;
      accountJSON["accountNumber"] = process.env.USER_ACCOUNT;

      const user = new User(userJSON);
      

      const found = await User.findOne({ email: user.email }).exec();

      if (found == null) {
        user.role = 'user';
        await user.save();
        const newUser = await User.findOne({ email: user.email }).exec();
        accountJSON["ownerID"] = newUser._id;
        accountJSON["balance"] = 500;
        const account = new Account(accountJSON);
        await account.save();
        console.log('Regular user and account successfully created\n');
      }
      else {
        console.log('Regular user not created: Duplicate email in the database');
      }
    });
  }
};
