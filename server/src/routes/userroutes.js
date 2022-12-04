const express = require('express');
const userroutes = express.Router();
const UserModel = require('../models/user');
const databaseConn = require("../database/conn");

/**
 * User Routes
 */
//SIGN UP
userroutes.post("/signup", async (req, res) => {
    try{
        const {email, firstname, lastname, password} = req.body;
        
        //Create new entry using User schema
        const newUser = new UserModel({ email, firstname, lastname, password });

        const savedData = await newUser.save();
        res.status(200).json(savedData)       
    }catch(err){
        res.status(400).send({
            message: error.messages
        });
    }
});


module.exports = userroutes;