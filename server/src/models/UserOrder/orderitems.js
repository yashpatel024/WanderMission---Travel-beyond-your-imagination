const mysql = require('../../database/mysql_conn');

const OrderItems = function () { };

/**
 * CREATE NEW ENTRY for Order items
 * @param {*} newOrderItems 
 * @param {*} result 
 */
OrderItems.create = (newOrderItems, result) => {
    mysql.query(
        "INSERT INTO OrderItemDetails (service_id, order_id, quantity, unit_price) VALUES ?",
        [newOrderItems.service_details.map(service =>
            [service.service_id, newOrderItems.order_id, service.quantity, service.unit_price])], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                return;
            });
}

module.exports = OrderItems;