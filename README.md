# WanderMission - Travel beyond your imagination

This project is associated with Assignment 2 in WebTechnologies

## Available Scripts

install NodeJS from 
## https://nodejs.org/en/download/

### `npm install` IN Client&Server directory
To install dependecies before you start running your project. 

In the Server directory, run server:
### `node server.js`

In the Client directory, you can run:
### `npm start`


Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Server Side localhost
[http://localhost:5000]

## System Architecture
![System Architecture](https://i.pinimg.com/originals/95/b0/6a/95b06ab7c2e3d3090ce41eddd1c18491.png)

# Requirement for client:
We are using React JS- 18.2.0 as a front-end.

## Dependencies 
Emotion 11.10.4
MUI Theam 5.10.9
reduxJs 1.8.6
axios 1.1.3
react-redux 8.0.4
react-router-dom 6.4.2
redux 4.2.0
redux persist 6.0.0
sass 1.54.0
web-vitals 2.1.4

# Requirement for server:
We are using Node JS- 8.19.2 as a front-end.

## Dependencies 
Bcrypt 2.4.3
connect-mongo 4.6.0
connect-mongo-session 3.1.1
cors 2.8.5
dotenv 16.0.3
express 4.18.2
express-session 1.17.3
mongoose 6.7.5
mongoose-unique-validator 3.1.0
nodemon 2.0.20

# API Routes
Go to link below to see whole API route Documentation in Postman
## https://documenter.getpostman.com/view/7663716/2s8YzUwgpL

## Security
1. Convert all passwords in HASH as soon as user inputs them.
2. Server Side validation for user passwords.
3. Cookies authentication for user data.
4. Dynamic data according to every user.

# Database Schema

## MongoDB
Because we have services which can be stored as a document, Also we can change or add new schema.

### Images:
```
"_id":"63867e9b2eb27423d24fa1f5"},
"image_id":{"$numberInt":"1"},
"image_name":"home gradient",
"image_url":"https://cal-generator.web.app/res/graphics/home-hero-grad.png"}
```

### agencies:
```
"$oid":"638d4f2012fc45e813244877"},
"agency_id":"1",
"agency_name":"SpaceX",
"agency_logo":"https://cal-generator.web.app/res/svgs/spacex_logo.png","agency_description":"Space Exploration Technologies Corp. is an American spacecraft manufacturer, launcher, and a satellite communications corporation headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk with the stated goal of reducing space transportation costs to enable the colonization of Mars.",
"createdAt":{"$date":{"$numberLong":"1670205216635"}},
"updatedAt":{"$date":{"$numberLong":"1670205216635"}},
"__v":{"$numberInt":"0"}}
```

### services:
```
"$oid":"638cea1f1ea886626b971be6"},
"trip_id":"st1",
"trip_name":"Mars",
"trip_logo":"https://cal-generator.web.app/res/svgs/Mars_product.svg","service_description":"Man kind’s First cursh to settle on, Thanks to a very loud person on the twitter.",
"no_of_reviews":{"$numberInt":"21"},
"rating":{"$numberDouble":"4.15"},
"travel_time":{"$numberInt":"1"},
"stay_time":{"$numberDouble":"0.5"},
"price":{"$numberInt":"150"},
"available_seats":{"$numberInt":"30"},
"total_seats":{"$numberInt":"50"},
"trip_type":"short",
"agency_id":"1",
"comments":[{
    "user_id":{"$oid":"638cde24fd756c90ce43b91d"},
    "user_name":"Yash","content":"First time - Down",
    "_id":{"$oid":"638e291a66250c529f47a6d2"},
    "createdAt":{"$date":{"$numberLong":"1670261018525"}},
    "updatedAt":{"$date":{"$numberLong":"1670261018526"}}},]}
"createdAt":{"$date":{"$numberLong":"1670179359124"}},
"updatedAt":{"$date":{"$numberLong":"1670863327479"}},
 "__v":{"$numberInt":"33"}}
```

### userSessions
```
"_id":"K-IU9fZUSOmlWHXEbT67EUFiUuGdrkRA",
"expires":{"$date":{"$numberLong":"1670976467085"}},
"session":{
    "cookie":{
        "originalMaxAge":{
            "$numberInt":"86400000"},
            "expires":{
                "$date":{
                    "$numberLong":"1670976467085"}
                    },
                    "secure":false,
                    "httpOnly":true,
                    "domain":null,
                    "path":"/",
                    "sameSite":false
                    },
                "user":{
                    "userid":{
                        "$oid":"638f45635904f682b06ad878"
                        },
                        "username":"Mayank Shiroya"
                        }}}
```

### usercarts
```
"$oid":"638fd795f1717de72690e8c8"},
"user_id":{
    "$oid":"638fd762f1717de72690e73c"},
    "services":[
        {"service_id":
        {"$oid":"638cea1f1ea886626b971be6"},
        "quantity":{"$numberInt":"2"},
        "service_name":"Mars",
        "service_image":"https://cal-generator.web.app/res/svgs/Mars_product.svg",
        "price":{"$numberInt":"600"},
        "_id":{"$oid":"638fd7dcf1717de72690e919"}}],
        "active":true,
        "modifiedOn":{"$date":{"$numberLong":"1670371221466"}},
        "createdAt":{"$date":{"$numberLong":"1670371221472"}},
        "updatedAt":{"$date":{"$numberLong":"1670371452524"}},
        "__v":{"$numberInt":"1"}}
```
### users
```
"$oid":"638cde24fd756c90ce43b91d"},
"email":"yashpatelit024@gmail.com",
"firstname":"Yash",
"lastname":"Patel",
"password":"$2a$10$7jNCcmZlTnXTqh66WFiDDu.8aVzNlZbx2vLzwGAYBLpVKrcUiMXyO",
"createdAt":{
    "$date":{"$numberLong":"1670176292167"}},
    "updatedAt":{
        "$date":{"$numberLong":"1670176292167"}
        },
"__v":{"$numberInt":"0"}}
```
## Amazon RDS
Managing orders are very complicated so we need relations so we have used SQL for order managemnet

### UserOrderDetails
```
CREATE TABLE `UserOrderDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `customer_first_name` varchar(25) DEFAULT NULL,
  `customer_last_name` varchar(25) DEFAULT NULL,
  `customer_passport_number` varchar(25) DEFAULT NULL,
  `customer_citizenship` varchar(25) DEFAULT NULL,
  `customer_dob` timestamp NULL DEFAULT NULL,
  `order_status` varchar(25) DEFAULT 'Pending',
  `net_total` decimal(50,0) DEFAULT NULL,
  `tax_amount` decimal(50,0) DEFAULT NULL,
  `gas_fees` decimal(50,0) DEFAULT NULL,
  `gross_total` decimal(50,0) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3
```
### OrderPaymentDetails
```
CREATE TABLE `OrderPaymentDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(50,0) DEFAULT NULL,
  `user_public_key` text,
  `payment_status` varchar(25) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_userorderdetails` (`order_id`),
  CONSTRAINT `fk_payment_userorderdetails` FOREIGN KEY (`order_id`) REFERENCES `UserOrderDetails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3
```
### OrderItemDetails
```
CREATE TABLE `OrderItemDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` varchar(50) NOT NULL,
  `order_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(50,0) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_userorderdetails` (`order_id`),
  CONSTRAINT `fk_item_userorderdetails` FOREIGN KEY (`order_id`) REFERENCES `UserOrderDetails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3
```

### OrderTravelDateDetials
```
CREATE TABLE `OrderTravelDateDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `travel_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_travel_userorderdetails` (`order_id`),
  CONSTRAINT `fk_travel_userorderdetails` FOREIGN KEY (`order_id`) REFERENCES `UserOrderDetails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3
```

# Technical Challanges
