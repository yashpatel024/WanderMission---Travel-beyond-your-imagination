const express = require('express');
const serviceroute = express.Router();
const ServiceModel = require('../models/service');

/**
 * Service Routes
 */

//Post Method
serviceroute.post('/insertService', async (req, res) => {
    try {
        //Create new entry using Service schema
        const newService = new ServiceModel(req.body);

        const dataToSave = newService.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(500).send({ message: error.messages });
    }
})

//Get all Method
serviceroute.get('/getAll', async (req, res) => {
    try {
        const data = await ServiceModel.find();
        res.status(200).json(savedData)       
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID MeÍthod
serviceroute.get('/getService/:id', async (req, res) => {
    try {
        const data = await ServiceModel.findById(req.params.id);
        res.status(200).json(savedData)       
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update by ID Method
serviceroute.patch('/updateService/:id', async (req, res) => {
    try {
        //Service id
        const id = req.params.id;
        //Data to update
        const updatedData = req.body;
        //Options which specifies to return the updated data back
        const options = { new: true };

        const result = await ServiceModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).json(savedData)       
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
serviceroute.delete('/deleteService/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ServiceModel.findByIdAndDelete(id);
        res.send(`Service with ${data.trip_name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = serviceroute;