const mysql = require('../../database/mysql_conn');
const OrderPayment = require('./orderpayment');
const OrderItem = require('./orderitems');
const OrderTravelDate = require('./ordertraveldate');
const ORDER_QUERY_CONSTANT = require('../../constant/userorderconstant');

//User Order Constructor
const UserOrder = function (userOrder) {
    this.user_id = userOrder.user_id,
        this.customer_first_name = userOrder.customer_first_name,
        this.customer_last_name = userOrder.customer_last_name,
        this.customer_passport_number = userOrder.customer_passport_number,
        this.customer_citizenship = userOrder.customer_citizenship,
        this.customer_dob = userOrder.customer_dob,
        this.net_total = userOrder.net_total,
        this.tax_amount = userOrder.tax_amount,
        this.gas_fees = userOrder.gas_fees,
        this.gross_total = userOrder.gross_total,
        this.user_public_key = userOrder.user_public_key,
        this.travel_dates = userOrder.travel_dates,
        this.service_details = userOrder.service_details
}

/**
 * Create Order Model Function
 * @param {*} newUserOrder 
 * @param {*} result 
 */
UserOrder.create = (newUserOrder, result) => {
    const user_public_key = newUserOrder.user_public_key;
    const travel_dates = newUserOrder.travel_dates;
    const service_details = newUserOrder.service_details;

    delete newUserOrder.user_public_key;
    delete newUserOrder.travel_dates;
    delete newUserOrder.service_details;

    mysql.query("INSERT INTO UserOrderDetails SET ?", newUserOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const newPaymentData = {
            order_id: res.insertId,
            amount: newUserOrder.gross_total,
            user_public_key: user_public_key
        };

        OrderPayment.create(newPaymentData, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // return result(null, res);
        });

        const newItemData = {
            order_id: res.insertId,
            service_details: service_details
        };

        OrderItem.create(newItemData, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // return result(null, res);
        });

        const newTravelDateData = {
            order_id: res.insertId,
            travel_dates: travel_dates
        };

        OrderTravelDate.create(newTravelDateData, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // return result(null, res);
        });

        result(null, { id: res.insertId, ...newUserOrder });
    });
}

/**
 * GET ALL Order Model Function
 * @param {*} user_id 
 * @param {*} result 
 */
UserOrder.getAll = (user_id, result) => {
    mysql.query(ORDER_QUERY_CONSTANT.SELECT_ALL_ORDERS, user_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        return;
    })
}

/**
 * GET specific order detail Model Function
 * @param {*} user_id 
 * @param {*} order_id 
 * @param {*} result 
 */
UserOrder.get = (user_id, order_id, result) => {
    mysql.query(ORDER_QUERY_CONSTANT.SELECT_ORDER_BY_ID, [user_id, order_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        return;
    })
}

/**
 * UPDATE order status Model Function
 * @param {*} order_id 
 * @param {*} updated_status 
 * @param {*} result 
 */
UserOrder.updateOrderStatus = (order_id, updated_status, result) => {
    mysql.query(ORDER_QUERY_CONSTANT.UPDATE_ORDER_STATUS, [updated_status, order_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
        return;
    })
}


module.exports = UserOrder;