const mysql = require("mysql");

//Environment variables configuration
require("dotenv").config({
    path: "./config.env"
});

var connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
});

module.exports = connection;