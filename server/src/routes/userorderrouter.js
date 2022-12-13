const express = require('express');
const userOrderRoute = express.Router();
const userOrderController = require('../controller/UserOrderController');

//find order details
userOrderRoute.get("/get/:id", userOrderController.get);

//findAll orders
userOrderRoute.get("/getall", userOrderController.getAll);

//create new order
userOrderRoute.post("/neworder", userOrderController.create);

//update Payment status
userOrderRoute.patch("/update/paymentstatus/:id", userOrderController.updatePaymentStatus);

//update Order status
userOrderRoute.patch("/update/orderstatus/:id", userOrderController.updateOrderStatus);

module.exports = userOrderRoute;