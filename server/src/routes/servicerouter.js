const express = require('express');
const serviceRoute = express.Router();
const serviceModel = require('../models/service');

/**
 * Service Routes
 */

//Post Method
serviceRoute.post('/insertService', async (req, res) => {
    try {
        let services = [];
        //Iterate through received json array of services
        req.body.services.forEach((data) => {
            //Create new entry using Service schema
            services.push(new serviceModel(data));
        });
        // console.log(services);
        await serviceModel.create(services, function (err) {
            if (err) { console.log(err.message) }
        });

        res.status(200).json({
            message: "Total " + req.body.services.length + " services saved."
        });
    } catch (error) {
        res.status(500).send({ 
            message: error.messages 
        });
    }
})

//Get all Method
serviceRoute.get('/getAll', async (req, res) => {
    try {
        const savedData = await serviceModel.find();
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(500).json({ 
            message: error.message 
        })
    }
})

//Get only Shorttrips services
serviceRoute.get('/shortTrips', async (req, res) => {
    try {
        const data = await serviceModel.find({ trip_type: { $gte: 'short' } });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get only LongTrip services
serviceRoute.get('/longTrips', async (req, res) => {
    try {
        const data = await serviceModel.find({ trip_type: 'long' });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID MeÍthod
serviceRoute.get('/getService/:id', async (req, res) => {
    try {
        const savedData = await serviceModel.findById(req.params.id);
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update by ID Method
serviceRoute.patch('/updateService/:id', async (req, res) => {
    try {
        //Service id
        const id = req.params.id;
        //Data to update
        const updatedData = req.body;
        //Options which specifies to return the updated data back
        const options = { new: true };

        const result = await serviceModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
serviceRoute.delete('/deleteService/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await serviceModel.findByIdAndDelete(id);
        res.send(`Service with ${data.trip_name} has been deleted..`);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = serviceRoute;