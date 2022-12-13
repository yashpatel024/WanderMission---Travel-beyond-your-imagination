const UserOrder = require("../models/UserOrder/userorder");
const OrderPayment = require("../models/UserOrder/orderpayment");

//Get user_id from cookie
function getUserId(req) {
    return req.session.user.userid.toString() || "";
}

// Create and Save a new UserOrder
exports.create = (req, res) => {
    let orderPaymentDetails, orderItemDetails, orderTravelDateDetails;

    // Validate session
    let user_id = getUserId(req);
    if (user_id == "")
        return res.status(401).json({ message: "Unauthorized" });

    // Check for valid request body
    if (!req.body) {
        res.status(400).send({
            message: "Please provide mandatory information"
        });
    }

    // Create a Order
    const userOrder = {
        user_id: user_id,
        customer_first_name: req.body.customer_first_name,
        customer_last_name: req.body.customer_last_name,
        customer_passport_number: req.body.customer_passport_number,
        customer_citizenship: req.body.customer_citizenship,
        customer_dob: req.body.customer_dob,
        net_total: req.body.net_total,
        tax_amount: req.body.tax_amount,
        gas_fees: req.body.gas_fees,
        gross_total: req.body.gross_total,
        user_public_key: req.body.user_public_key,
        travel_dates: req.body.travel_dates,
        service_details: req.body.service_details
    };

    // Save Order in the database
    UserOrder.create(userOrder, (err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User Order."
            });
        return res.status(200).json(data);
    });
};

// Retrieve all Orders from the database (with condition).
exports.getAll = (req, res) => {
    //validate session
    let user_id = getUserId(req);
    if (user_id == "")
        return res.status(401).json({ message: "Unauthorized" });

    UserOrder.getAll(user_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.status(200).send(data);
    });
};

// Find a single Order by Id
exports.get = (req, res) => {
    //validate session
    let user_id = getUserId(req);
    if (user_id == "")
        return res.status(401).json({ message: "Unauthorized" });

    UserOrder.get(user_id, req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Order with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Payment Status of order identified by the id in the request
exports.updatePaymentStatus = (req, res) => {
    //validate session
    let user_id = getUserId(req);
    if (user_id == "")
        return res.status(401).json({ message: "Unauthorized" });

    // Check for valid request body
    if (!req.body.status) {
        res.status(400).send({
            message: "Please provide mandatory information"
        });
    }
    OrderPayment.updatePaymentStatus(
        req.params.id,
        req.body.status,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.id
                    });
                }
            } else res.status(200).send(data);
        }
    );
};

// Update a Order Status of order identified by the id in the request
exports.updateOrderStatus = (req, res) => {
    //validate session
    let user_id = getUserId(req);
    if (user_id == "")
        return res.status(401).json({ message: "Unauthorized" });

    // Check for valid request body
    if (!req.body.status) {
        res.status(400).send({
            message: "Please provide mandatory information"
        });
    }

    UserOrder.updateOrderStatus(
        req.params.id,
        req.body.status,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.status(200).send(data);
        }
    );
};