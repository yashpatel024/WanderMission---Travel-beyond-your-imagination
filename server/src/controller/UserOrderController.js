const UserOrder = require("../models/UserOrder/userorder");

// Create and Save a new UserOrder
exports.create = (req, res) => {
    let user_id;
    let orderPaymentDetails, orderItemDetails, orderTravelDateDetails;

    // Validate session
    if (req.session.user) {
        user_id = req.session.user.userid;
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //Validate session
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

// // Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//     const title = req.query.title;

//     Tutorial.getAll(title, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         else res.send(data);
//     });
// };

// // Find a single Tutorial by Id
// exports.findOne = (req, res) => {
//     Tutorial.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Tutorial with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving Tutorial with id " + req.params.id
//                 });
//             }
//         } else res.send(data);
//     });
// };

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Tutorial.getAllPublished((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         else res.send(data);
//     });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }

//     console.log(req.body);

//     Tutorial.updateById(
//         req.params.id,
//         new Tutorial(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Not found Tutorial with id ${req.params.id}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating Tutorial with id " + req.params.id
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     Tutorial.remove(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Tutorial with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Tutorial with id " + req.params.id
//                 });
//             }
//         } else res.send({ message: `Tutorial was deleted successfully!` });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Tutorial.removeAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all tutorials."
//             });
//         else res.send({ message: `All Tutorials were deleted successfully!` });
//     });
// };