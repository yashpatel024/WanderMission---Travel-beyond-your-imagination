const express = require('express');
const userroutes = express.Router();
const UserModel = require('../models/user');

/**
 * User Routes
 */
//SIGN UP
userroutes.post("/signup", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        // console.log(req.body);
        
        //Validate using Joi's SignUp object
        // await Joi.validate({ username, email, password}, SignUp);

        //Create new entry using User schema
        const newUser = new UserModel({ username, email, password });

        const savedData = await newUser.save();
        res.status(200).json(savedData)       
    }catch(err){
        res.status(400).send({
            message: error.messages
        });
    }
});

//Get all Method
userroutes.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
userroutes.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
userroutes.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
userroutes.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = userroutes;