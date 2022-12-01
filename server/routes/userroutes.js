import Joi from "joi";
import { SignIn, SignUp } from "../validations/user";
import User from "../models/user";

const express = require("express");

/*
 * userRoutes object is an instance of express router
 * Use for defining routes related to user
 * Router will be added as middleware and will take control of request starting with /user
 */
const userRoutes = express.Router();

/**
 * User Routes
 */
//Get ALL
userRoutes.post("/signup", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        console.log(req.body);
        
        //Validate using Joi's SignUp object
        await Joi.validate({ username, email, password}, SignUp);

        //Create new entry using User schema
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.send({
            userId: newUser.id,
            username
        });
    }catch(err){
        res.status(400).send(err);
    }
});

/**
 * Services Routes
 */

//Get ALL
userRoutes.route("/services").get(function (req, res) {
    //databasebname
    let dbConnect = databaseConn.getDb("WanderMissionDatabase");

    dbConnect
        .collection("Services")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

userRoutes.route("/agency").get(function (req, res) {
    //databasebname
    let dbConnect = databaseConn.getDb("WanderMissionDatabase");

    dbConnect
        .collection("Agency")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


//GET by Id
// userRoutes.route("/user/:id").get(function (req, res) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("records").findOne(myquery, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//     });
// });

export default userRoutes;
