const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    service_id:{
        type: String,
        required: true
    },
    trip_name:{
        type: String,
        required: true
    },
    trip_logo:{
        type: String,
        required: true
    },
    service_description:{
        type: String,
        required: true
    },
    no_of_reviewes:{
        type: Number,
        required: true
    },
    service_rating:{
        type: Decimal128,
        required: true,
    },
    travel_time:{
        type: Number,
        required: true
    },
    stay_time:{
        type: Decimal128,
        required: true
    },
    price:{
        type: Decimal128,
        required: true
    },
    available_seats:{
        type: Number,
        required: true
    },
    agency_id:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);