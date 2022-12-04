const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

//Pre-hook for schema, This code will run before User instance saves
UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
});

// //Custom validator for username and password field
// //This is async step so we use asyncs/await to check if field exists or not
// //Database level validations
// UserSchema.statics.doesNotExist = async function (field) {
//     console.log(this.where(field).countDocuments === 0);
//     return await this.where(field).countDocuments === 0;
// }

//Method to checked hashed password
UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);