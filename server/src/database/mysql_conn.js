const mysql = require("mysql");

//Environment variables configuration
require("dotenv").config({
    path: "./config.env"
});

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
});

module.exports = {
    connectDb: () => {
        connection.connect(function (error) {
            if (error) {
                console.log('MYSQL Connection failed', error.message);
                return;
            }
            console.log("Mysql connected");
        });
    },
    disconnectDb: () => {
        connection.end();
    }
}