const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const serviceSchema = new mongoose.Schema({
    trip_id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    trip_name: {
        type: String,
        required: true,
        index: true
    },
    trip_logo: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    no_of_reviews: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    travel_time: {
        type: Number,
        required: true
    },
    stay_time: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available_seats: {
        type: Number,
        required: true
    },
    total_seats: {
        type: Number,
        required: true
    },
    trip_type: {
        type: String,
        required: true,
        index: true
    },
    agency_id: {
        //ref from Agency table
        type: String,
        required: true
    },
    comments: [
        {
            user_id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User',
                required: true,
            },
            user_name: {
                type: String,
                required: true
            },
            content: String,
            given_rating: {
                type: Number,
                min: 1,
                max: 5
            },
            createdAt: {
                type: Date,
                default: () => Date.now(),
                immutable: true,
            },
            updatedAt: {
                type: Date,
                default: () => Date.now(),
            },
        }
    ]
}, { timestamps: true });

//Unique Validator for trip_id field
serviceSchema.plugin(uniqueValidator, { message: 'is already present.' });

module.exports = mongoose.model('Service', serviceSchema);