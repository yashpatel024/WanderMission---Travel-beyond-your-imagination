const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); //To store session automatically on Mongo

const databaseConn = require('./src/database/conn');
const routes = require('./src/routes/index');

//Environment variables configuration
require("dotenv").config({
    path: "./config.env"
});

//express object
const app = express();
//Server port
const port = process.env.PORT || 5000;
//Max age of cookie = 1 hour is default
const MAX_AGE_COOKIE = 1000*60*60*24;

//To allow only to specified origin
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200, //for legacy browser; default is 204
};

//Connect with MongoDB using Cluster url defined in env variable
databaseConn.connectDb(process.env.ATLAS_URI);

//Setup connect-mongodb-session store
const mongoDBStore = new MongoDBStore({
    uri: process.env.ATLAS_URI,
    collection: 'userSessions',
});

app.use(
    session({
        secret: process.env.SECRET_KEY,
        name: process.env.SESSION_KEY,
        store: mongoDBStore,
        cookie: {
            maxAge: MAX_AGE_COOKIE,
            sameSite: false,
            //true IN production
            secure: false, 
            //to prevent XSS attacks, HttpOnly cookies are inaccessible to document.cookie js Api, they are only sent to server.
            httpOnly: true
        },
        resave: true,
        saveUninitialized: false
    })
);

//disabling "x-powered-by", so requester doesn't know we are using express
app.disable('x-powered-by');
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended:true }));

//Routing
const apirouter = express.Router();
app.use('/wandermission', apirouter);
apirouter.use('/user', routes.userRoute);
apirouter.use('/user/cart', routes.userCartRoute);
apirouter.use('/service', routes.serviceRoute);
apirouter.use('/service/feedback', routes.serviceFeedbackRoute);
apirouter.use('/agency', routes.agencyRoute);

//App runs on port:5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})