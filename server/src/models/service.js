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
    no_of_reviews:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true,
    },
    travel_time:{
        type: Number,
        required: true
    },
    stay_time:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    available_seats:{
        type: Number,
        required: true
    },
    total_seats:{
        type: Number,
        required: true
    },
    trip_type:{
        type: String,
        required: true
    },
    agency_id:{
        type: String,
        required: true
    },
    comments:[
        {
            user_id: String,
            content: String,
            given_rating: Number,
            created_date: Date,
            updated_date: Date
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);