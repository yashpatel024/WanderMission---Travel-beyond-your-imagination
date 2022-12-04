const express = require('express');
const userRoute = express.Router();
const userModel = require('../models/user');
const databaseConn = require("../database/conn");

/**
 * User Routes
 */
//SIGN UP
userRoute.post("/signup", async (req, res) => {
    try{
        const {email, firstname, lastname, password} = req.body;
        
        //Create new entry using User schema
        const newUser = new userModel({ email, firstname, lastname, password });

        const savedData = await newUser.save();
        res.status(200).json(savedData)       
    }catch(error){
        res.status(400).send({
            message: error.message
        });
    }
});


module.exports = userRoute;