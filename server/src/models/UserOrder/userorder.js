const mysql = require('../../database/mysql_conn');
const OrderPayment = require('./orderpayment');
const OrderItem = require('./orderitems');
const OrderTravelDate = require('./ordertraveldate');

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

UserOrder.create = (newUserOrder, result) => {
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
            amount: this.gross_total,
            user_public_key: this.user_public_key
        };

        OrderPayment.create(newPaymentData, (err, result) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            return result(null, res);
        });

        const newItemData = {
            order_id: res.insertId,
            service_details: this.service_details
        };

        OrderItem.create(newItemData, (err, result) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            return result(null, res);
        });

        const newTravelDateData = {
            order_id: res.insertId,
            travel_dates: this.travel_dates
        };

        OrderTravelDate.create(newTravelDateData, (err, result) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            return result(null, res);
        });

        result(null, { id: res.insertId, ...newUserOrder });
    });
}

module.exports = UserOrder;