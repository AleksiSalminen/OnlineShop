
module.exports = async productConfig => {

    const Product = require('../models/product');
  
    const product1 = await Product.findOne({ name: 'Old sofa' }).exec();
  
    if(product1) {
        console.log('Product "Old sofa" not created: Already exists in the database');
    }
    else {
        let product1JSON = {};
        //product1JSON["id"] = process.env.PRODUCT1_ID;
        product1JSON["name"] = process.env.PRODUCT1_NAME;
        product1JSON["description"] = process.env.PRODUCT1_DESCRIPTION;
        product1JSON["purchasePrice"] = process.env.PRODUCT1_PURCHASEPRICE;
        product1JSON["sellingPrice"] = process.env.PRODUCT1_SELLINGPRICE;
        product1JSON["accepted"] = process.env.PRODUCT1_ACCEPTED;
        product1JSON["ownerID"] = process.env.PRODUCT1_OWNERID;

        const product = new Product(product1JSON);
        await product.save();
        console.log('Product "Old sofa" successfully created');
    }


    const product2 = await Product.findOne({ name: 'Phone' }).exec();
  
    if(product2) {
        console.log('Product "Phone" not created: Already exists in the database');
    }
    else {
        let product2JSON = {};
        //product2JSON["id"] = process.env.PRODUCT2_ID;
        product2JSON["name"] = process.env.PRODUCT2_NAME;
        product2JSON["description"] = process.env.PRODUCT2_DESCRIPTION;
        product2JSON["purchasePrice"] = process.env.PRODUCT2_PURCHASEPRICE;
        product2JSON["sellingPrice"] = process.env.PRODUCT2_SELLINGPRICE;
        product2JSON["accepted"] = process.env.PRODUCT2_ACCEPTED;
        product2JSON["ownerID"] = process.env.PRODUCT2_OWNERID;

        const product = new Product(product2JSON);
        await product.save();
        console.log('Product "Phone" successfully created');
    }
};
  