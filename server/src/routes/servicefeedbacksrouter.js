const express = require('express');
const mongoose = require('mongoose');
const serviceFeedbackRoute = express.Router();
const serviceModel = require('../models/service');
const userModel = require('../models/user');

/**
 * Service Feedback Routes
 * Comments and Rating
 */

/**
 * Insert Comment with userId and contentMessage
 */
serviceFeedbackRoute.post("/addcomment", async (req, res) => {
    const serviceId = req.body.serviceId;
    const userId = req.body.userId;
    const content = req.body.content;
    
    try {
        //fetch target User and Service Model
        const targetUserModel = await userModel.findById(userId);
        const targetServiceModel = await serviceModel.findById(serviceId);

        //create id comment and push it - For fetching id of inserted comment
        const newCommentId = new mongoose.Types.ObjectId();

        //variable for new comment object
        var newComment = {
            _id: newCommentId,
            user_id: targetUserModel._id,
            content: content,
            updated_date: Date.now()
        }

        //Push new comment into array of comments
        targetServiceModel.comments.push(newComment);

        //Save model to reflect changes
        targetServiceModel.save(function (err) {
            if (err) { return next(err); }

            //return successfully created comment
            resObj = {
                "response": newComment
            };

            res.status(200).send(
                JSON.stringify(resObj)
            );
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * Update Comment with new Message
 */
serviceFeedbackRoute.patch("/updatecomment", async (req, res) => {
    const serviceId = req.body.serviceId;
    const commentId = req.body.commentId;
    const content = req.body.content;
    const userId = req.body.userId;

    try {
        const targetServiceModel = await serviceModel.findById(serviceId);

        if (targetServiceModel == null)
            throw 'Service does not exists.';

        //Iterate through comments, to update given comment
        targetServiceModel.comments.forEach(updateComment);

        function updateComment(item, index, arr) {
            if (item._id == commentId) {
                //User should be matched, otherwise give an error
                if (item.user_id != userId) {
                    throw 'User does not have a permission.';
                }

                //Change content and updatedAt
                arr[index].content = content;
                arr[index].updatedAt = Date.now();
            }
        }

        targetServiceModel.save(function (err) {
            if (err) { return next(err); }

            resObj = {
                "response": "success"
            };
            res.status(200).send(JSON.stringify(resObj));
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * Delete Comment with specific commentId and ServiceId
 */
serviceFeedbackRoute.delete("/deletecomment", async (req, res) => {
    const commentId = req.body.commentId;
    const serviceId = req.body.serviceId;
    const userId = req.body.userId;

    try {
        const targetServiceModel = await serviceModel.findById(serviceId);

        if (targetServiceModel == null)
            throw 'Service does not exists.';

        //Iterate through comments, to delete given comment
        targetServiceModel.comments.forEach(deleteComment);

        function deleteComment(item, index, arr) {
            if (item._id == commentId) {
                //User should be matched, otherwise give an error
                if (item.user_id != userId) {
                    throw 'User does not have a permission.';
                }

                //remove specific index
                arr.splice(index, 1);
            }
        }

        targetServiceModel.save(function (err) {
            if (err) { return next(err); }

            resObj = {
                "response": "success"
            };
            res.status(200).send(JSON.stringify(resObj));
        });
    } catch (error) {
        res.status(500).json({ message: error.message }); Í
    }
});

module.exports = serviceFeedbackRoute;