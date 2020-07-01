
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accountSchema = new Schema({
    creditCard: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{16}$/
    },
    accountNumber: {
        type: String,
        required: true,
        match: /^[A-Z]{2}[0-9]{16}$/
    },
    balance: {
        type: Number,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    }

}, {
    collection: 'Accounts'
});

accountSchema.set('toJSON', { virtuals: true });

const Account = new mongoose.model('Account', accountSchema);
module.exports = Account;