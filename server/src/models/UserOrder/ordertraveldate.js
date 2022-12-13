const mysql = require('../../database/mysql_conn');

const OrderTravelDates = function () {};

/**
 * CREATE new entry of Travel dates
 * @param {*} newTravelDateData 
 * @param {*} result 
 */
OrderTravelDates.create = (newTravelDateData, result) => {
    mysql.query(
        "INSERT INTO OrderTravelDateDetails (order_id, travel_date) VALUES ?",
        [newTravelDateData.travel_dates.map(date => 
            [newTravelDateData.order_id, date])], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        return;
    });
}

module.exports = OrderTravelDates;