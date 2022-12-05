const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname: String,
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Unique Validator for email field
userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

//Pre-hook for schema, This code will run before User instance saves
userSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

//Method to checked hashed password
userSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);