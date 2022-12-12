const express = require('express');
const userOrderRoute = express.Router();
const userOrderController = require('../controller/UserOrderController');

//Find Order details
// userOrderRoute.post("/", userOrderController.find);

//findAll - TODO
// userOrderRoute.post("/findall", userOrderController.findall);

//create new order
userOrderRoute.post("/neworder", userOrderController.create);

//update order
// userOrderRoute.get("/updateorder", userOrderController.update);

//delete order
// userOrderRoute.delete("/delete", userOrderController.delete);

module.exports = userOrderRoute;