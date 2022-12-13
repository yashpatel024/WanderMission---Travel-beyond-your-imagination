const mysql = require('../../database/mysql_conn');
const ORDER_QUERY_CONSTANT = require('../../constant/userorderconstant');

const OrderPayment = function () {};

/**
 * Create New Payment Entry
 * @param {*} newOrderPayment 
 * @param {*} result 
 */
OrderPayment.create = (newOrderPayment, result) => {
    mysql.query("INSERT INTO OrderPaymentDetails SET ?", newOrderPayment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        return;
    });
}

/**
 * UPDATE Payment Status Model Function
 * @param {*} order_id 
 * @param {*} updated_status 
 * @param {*} result 
 */
OrderPayment.updatePaymentStatus = (order_id, updated_status, result) => {
    mysql.query(ORDER_QUERY_CONSTANT.UPDATE_PAYMENT_STATUS, [updated_status, order_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        return;
    })
}

module.exports = OrderPayment;