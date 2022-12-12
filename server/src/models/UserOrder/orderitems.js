const mysql = require('../../database/mysql_conn');

const OrderItems = function () {};

OrderItems.create = (newOrderPayment, result) => {
    mysql.query("INSERT INTO OrderPaymentDetails SET ?", newOrderPayment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Order Payment id: "+res.insertId);
        result

    });
}

module.exports = OrderItems;