const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userCartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    services: [
        {
            service_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service'
            },
            quantity: Number,
            service_name: String,
            price: Number
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('UserCart', userCartSchema);