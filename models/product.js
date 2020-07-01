
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const path = 'http://localhost:3000/';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: false
    },
    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: false,
        min: 0
    },
    accepted: {
        type: Boolean,
        default: false
    },
    ownerID: {
        type: String,
        required: true
    }
}, {
    collection: 'Products'
});

productSchema.virtual('links').get(function () {
    return [{'self':path+'api/products/'+this._id}];
});
productSchema.set('toJSON', { virtuals: true })

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;
