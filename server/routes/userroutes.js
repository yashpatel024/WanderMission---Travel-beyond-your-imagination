import Joi from "joi";
import { SignIn, SignUp } from "../validations/user";
import User from "../models/user";

const express = require("express");

/*
 * userRoutes object is an instance of express router
 * Use for defining routes related to user
 * Router will be added as middleware and will take control of request starting with /user
 */
const userRoutes = express.Router();

/**
 * User Routes
 */
//Get ALL
userRoutes.post("/signup", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        console.log(req.body);
        
        //Validate using Joi's SignUp object
        await Joi.validate({ username, email, password}, SignUp);

        //Create new entry using User schema
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.send({
            userId: newUser.id,
            username
        });
    }catch(err){
        res.status(400).send(err);
    }
});

// userRoutes.route("/signin").get(function (req, res){
//     try{
//         const {username, password} = req.body;

//         //Validate using Joi's SignIn object
//         await Joi.validate({ username, password}, SignIn);

//     }
// });

export default userRoutes;
