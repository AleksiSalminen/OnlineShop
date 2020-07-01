
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const path = 'http://localhost:3000/';

const purchaseSchema = new Schema({
    buyerID: {
        type: String,
        required: true
    },
    buyerCredit4last: {
        type: String,
        required: true,
        match: /^[0-9]{4}$/
    },
    productName: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    collection: 'Purchases'
});

purchaseSchema.virtual('links').get(function () {
    return [{'self':path+'api/purchases/'+this._id}];
});
purchaseSchema.set('toJSON', { virtuals: true });

const Purchase = new mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;