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
            //userSession object
            const userSession = {
                email: targetUserModel.email,
                username: targetUserModel.firstname + " " + targetUserModel.lastname
            }

            //we save session object in req.session so it passes with every request
            req.session.user = userSession;

            //session object is sent in response so it'll store in cookie
            res.status(200).json({ "response": "You have logged in successfully ", userSession });
        } else {
            res.status(400).json({ "response": "Incorrect credential" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

userRoute.post("/isAuth", async (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json(message: "unauthorized");
    }
});

module.exports = userRoute;