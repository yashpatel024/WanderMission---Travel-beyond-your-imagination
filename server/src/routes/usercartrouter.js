const express = require("express");
const userCartRoute = express.Router();
const userCartModel = require("../models/usercart");

/**
 * User Cart Routes
 */

/**
 * Fetch User Cart details
 */
userCartRoute.get("/get", async (req, res) => {
    //Check for cookie from session
    if (req.session.user) {
        const user_id = req.session.user.userid;

        try {
            let targetCartModel = await userCartModel.findOne({ user_id });

            if (targetCartModel) {
                //cart exists for user
                return res.status(200).json(targetCartModel);
            } else {
                //no cart for user, create new cart
                const newCart = await userCartModel.create({
                    user_id,
                    services: []
                });

                return res.status(200).json(newCart);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    } else {
        res.status(500).json({
            message: "Please log in"
        });
    }
});

/**
 * Insert/Update cart for user
 */
userCartRoute.post("/update", async (req, res) => {
    let user_id;
    if (req.session.user) {
        user_id = req.session.user.userid;
    } else {
        user_id = req.body.user_id;
    }
    const { service_id, quantity, service_name, price, service_image } = req.body;

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
                targetCartModel.services.push({ service_id, quantity, service_name, service_image, price });
            }
            targetCartModel = await targetCartModel.save();
            return res.status(200).send(targetCartModel);
        } else {
            //no cart for user, create new cart
            const newCart = await userCartModel.create({
                user_id,
                services: [{ service_id, quantity, service_name, service_image, price }]
            });

            return res.status(200).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

/**
 * Remove all services from cart for user
 */
userCartRoute.delete("/reset", async (req, res) => {
    let user_id;
    if (req.session.user) {
        user_id = req.session.user.userid;
    } else {
        user_id = req.body.user_id;
    }

    try {
        let targetCartModel = await userCartModel.findOne({ user_id });

        if (targetCartModel) {
            //cart exists for user
            //remove services from cart
            targetCartModel.services = [];
            targetCartModel = await targetCartModel.save();

            res.status(200).json({"response": "success"})
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }

});
module.exports = userCartRoute;