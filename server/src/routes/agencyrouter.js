const express = require('express');
const agencyRoute = express.Router();
const agencyModel = require('../models/agency');

/**
 * Agency Routes
 */

//Insert Agency
agencyRoute.post('/insert', async (req, res) => {
    let agencies = [];

    //Iterate through received json array of agency
    req.body.agencies.forEach((data) => {
        //Create new entry using Agency schema
        agencies.push(new agencyModel(data));
    });

    try {
        await agencyModel.create(agencies, {});

        res.status(200).json({
            "response": "Total " + agencies.length + " agencies saved."
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

//Get all Method
agencyRoute.get('/getAll', async (req, res) => {
    try {
        const savedData = await agencyModel.find();
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

//Get by ID MeÍthod
agencyRoute.get('/get/:id', async (req, res) => {
    try {
        const savedData = await agencyModel.findById(req.params.id);
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update by ID Method
agencyRoute.patch('/update/:id', async (req, res) => {
    try {
        //Agency id
        const id = req.params.id;
        //Data to update
        const updatedData = req.body;
        //Options which specifies to return the updated data back
        const options = { new: true };

        const result = await agencyModel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
agencyRoute.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await agencyModel.findByIdAndDelete(id);
        res.json({ "response": `Agency with ${data.agency_name} has been deleted..` });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = agencyRoute;