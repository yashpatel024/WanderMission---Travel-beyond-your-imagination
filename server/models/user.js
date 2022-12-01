import mongoose from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

/*
* User Schema created using Mongoose
* - Type defined for each field,
* - Custom validator for username and email
* - Simple validator "required" for password
*/
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        validate:{
            validator: username => User.doesNotExist({ username }),
            message: "Username already exists"
        }
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator: email => User.doesNotExist({ email }),
            message: "Email already exists"
        }
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

//Pre-hook for schema, This code will run before User instance saves
UserSchema.pre('save', function(){
    if(this.isModified('password')){
        this.password = hashSync(this.password, 10);
    }
});

//Custom validator for username and password field
//This is async step so we use asyncs/await to check if field exists or not
//Database level validations
UserSchema.statics.doesNotExist = async function (field){
    console.log(this.where(field).countDocuments === 0);
    return await this.where(field).countDocuments === 0;
}

//Method to checked hashed password
UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
}

//Schema "User" creation
const User = mongoose.model('User', UserSchema);

export default User;