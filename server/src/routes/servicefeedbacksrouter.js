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
 * Route - Insert Comment with userId and contentMessage, and rating
 */
serviceFeedbackRoute.post("/addcomment", async (req, res) => {
    let userId;
    if (req.session.user) {
        userId = req.session.user.userid;
    } else {
        userId = req.body.userId;
    }

    const { serviceId, content, rating } = req.body;

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
            user_name: targetUserModel.firstname + " " + targetUserModel.lastname,
            content: content,
            given_rating: rating,
            updated_date: Date.now()
        }

        //Push new comment into array of comments
        targetServiceModel.comments.push(newComment);
        //Update new rating
        let newRating = getUpdatedRating(rating, targetServiceModel.rating, targetServiceModel.no_of_reviews);
        targetServiceModel.rating = newRating[0]
        targetServiceModel.no_of_reviews = newRating[1];

        //Save model to reflect changes
        targetServiceModel.save(function (err) {
            if (err) {
                return res.status(500).json({ message: error.message })
            }

            //return successfully created comment
            resObj = {
                "response": {
                    "rating": newRating[0],
                    "new_comment": newComment
                }
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
 * Calculate Updated Rating
 * @param {*} newRating 
 * @param {*} currentRating 
 * @param {*} currentNoOfRating 
 * @returns 
 */
function getUpdatedRating(newRating, currentRating, currentNoOfRating) {
    //If no reviews before, return current one
    if (currentNoOfRating <= 0 || currentRating == 0) {
        return [newRating, 1];
    }

    //If no new review, then return previous
    if (newRating == null) {
        return [currentRating, currentNoOfRating];
    }

    let denomenator = parseFloat(newRating) + (currentRating * currentNoOfRating);
    let numerator = currentNoOfRating + 1;

    //calculated new average
    return [
        (denomenator / numerator).toFixed(2)
        , (currentNoOfRating + 1)
    ];
}

/**
 * Route - Update Comment with new Message
 */
serviceFeedbackRoute.patch("/updatecomment", async (req, res) => {
    const { serviceId, commentId, userId, content } = req.body;

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
    const { serviceId, commentId, userId } = req.body;

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