const express = require('express');
const userRoute = express.Router();
const userModel = require('../models/user');
const databaseConn = require("../database/conn");

/**
 * User Routes
 */
//SIGN UP
userRoute.post("/signup", async (req, res) => {
    const { email, firstname, lastname, password } = req.body;

    if (!email || !firstname || !password) {
        res.status(400).json({ message: "Please provide mandatory information" });
    }

    try {
        //Create new entry using User schema
        const newUser = new userModel({ email, firstname, lastname, password });

        const savedData = await newUser.save();
        res.status(201).json(savedData)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

userRoute.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please provide mandatory information" });
    }

    try {
        //finding user in Database
        const targetUserModel = await userModel.findOne({ email });
        if (!targetUserModel) {
            res.status(400).json({ "response": "User not found" });
        }
        
        //Comparing password with hash of saved password
        if (targetUserModel.comparePasswords(password)) {
            res.status(200).json({ "response": "You have logged in successfully" });
        } else {
            res.status(400).json({ "response": "Incorrect credential" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = userRoute;