const express = require('express');
const serviceFeedbackRoute = express.Router();
const serviceModel = require('../models/service');
const userModel = require('../models/user');

/**
 * Service Feedback Routes
 * Comments and Rating
 */
serviceFeedbackRoute.post("/addcomment", async (req, res) => {
    try{
        const serviceId = req.body.serviceId;
        const userId = req.body.userId;
        const content = req.body.content;

        const targetUserModel = await userModel.findById(userId);
        const targetServiceModel = await serviceModel.findById(serviceId);

        var newComment = {
            user_id : targetUserModel._id,
            content : content,
            updated_date : Date.now()
        }

        targetServiceModel.comments.push(newComment);

        targetServiceModel.save(function (err) {
            if (err) { return next(err); }

            resObj = {
                "res": targetServiceModel.comments._id
            };
            res.status(200).send(JSON.stringify(resObj));
        });
    }catch(error){
        res.status(500).json({ message: error.message })
    }
});

serviceFeedbackRoute.patch("/updatecomment", async (req, res) => {
    try{
        const serviceId = req.body.serviceId;
        const commentId = req.body.commentId;
        const content = req.body.content;
        
        var updateComment = {
            $push: {
                comments: {
                    _id: commentId,
                    content: content,
                    updatedAt: Date.now()
                }
            }
        };

        targetServiceModel.findByIdAndUpdate(serviceId, updateComment);

        targetServiceModel.save(function (err) {
            if (err) { return next(err); }

            resObj = {
                "res": targetServiceModel._id
            };
            res.status(200).send(JSON.stringify(resObj));
        });
    }catch(error){
        res.status(500).json({ message: error.message })
    }
});

module.exports = serviceFeedbackRoute;