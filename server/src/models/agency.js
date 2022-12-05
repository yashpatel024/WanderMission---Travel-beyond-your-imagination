const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const agencySchema = new mongoose.Schema({
    agency_id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    agency_name: {
        type: String,
        required: true,
        index: true
    },
    agency_logo: {
        type: String,
        required: true
    },
    agency_description: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Unique Validator for agency_id field
agencySchema.plugin(uniqueValidator, { message: 'is already present.' });

module.exports = mongoose.model('Agency', agencySchema);