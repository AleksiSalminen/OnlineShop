
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        // minimum length defined just to make sure that an empty string is not allowed
        minlength: 1
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'user',
        enum: ['user', 'shopkeeper', 'admin']
    }

}, {
    collection: 'Users'
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
