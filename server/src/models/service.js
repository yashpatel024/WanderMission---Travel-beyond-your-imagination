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
        required: true
    },
    rating:{
        type: Number,
        required: true,
    },
    travel_time: {
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
            content: String,
            // given_rating: Number,
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