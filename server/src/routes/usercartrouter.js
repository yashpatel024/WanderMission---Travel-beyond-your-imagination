const express = require("express");
const userCartRoute = express.Router();
const userCartModel = require("../models/usercart");

/**
 * User Cart Routes
 */
userCartRoute.post("/", async (req, res) => {
    const { user_id, service_id, quantity, service_name, price  } = req.body;

    try {
        let targetCartModel = await userCartModel.findOne({ user_id });

        if (targetCartModel) {
            //cart exists for user
            let itemIndex = targetCartModel.services.findIndex(
                service => service.service_id == service_id
            );

            if (itemIndex > -1) {
                //service exists in the cart, update the quantity
                let serviceItem = targetCartModel.services[itemIndex];
                serviceItem.quantity = quantity;
                targetCartModel.services[itemIndex] = serviceItem;
            } else {
                //service does not exists in cart, add new item
                targetCartModel.services.push({ service_id, quantity, service_name, price });
            }
            targetCartModel = await targetCartModel.save();
            return res.status(201).send(targetCartModel);
        } else {
            //no cart for user, create new cart
            const newCart = await userCartModel.create({
                user_id,
                services: [{ service_id, quantity, service_name, price }]
            });

            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send( {message: error.message});
    }
});

module.exports = userCartRoute;