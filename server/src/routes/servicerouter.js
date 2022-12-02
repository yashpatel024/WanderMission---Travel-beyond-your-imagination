const express = require('express');
const serviceroute = express.Router();
const ServiceModel = require('../models/service');

/**
 * Service Routes
 */

//Post Method
serviceroute.post('/insertservice', async (req, res) => {
    res.send('Post API')
    try{
        //Create new entry using Service schema
        const newService = new ServiceModel(req.body);

        const savedData = await newService.save();
        res.status(200).json(savedData)       
    }catch(err){
        res.status(500).send({
            message: error.messages
        });
    }
})

//Get all Method
serviceroute.get('/getAll', async (req, res) => {
    res.send('Get All API')
    try{
        const data = await ServiceModel.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
serviceroute.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
serviceroute.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
serviceroute.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = serviceroute;