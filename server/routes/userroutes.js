const express = require("express");

/*
 * userRoutes object is an instance of express router
 * Use for defining routes related to user
 * Router will be added as middleware and will take control of request starting with /user
 */
const userRoutes = express.Router();

//Connect to database
const databaseConn = require("../database/conn");

//Will help in convert String:Id to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

/**
 * User Routes
 */

//Get ALL
userRoutes.route("/user").get(function (req, res) {
    //databasebname
    let dbConnect = databaseConn.getDb("WanderMissionDatabase");

    dbConnect
        .collection("Users")
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

// // This section will help you create a new record.
// recordRoutes.route("/user/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myobj = {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level,
//     };
//     db_connect.collection("records").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
//    });
   

//    // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//       $set: {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//       },
//     };
//     db_connect
//       .collection("records")
//       .updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         response.json(res);
//       });
//    });

//    // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       response.json(obj);
//     });
//    });

module.exports = userRoutes;
