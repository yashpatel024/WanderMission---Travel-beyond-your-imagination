const express = require('express');
const cors = require('cors');
const databaseConn = require('./src/database/conn');
const routes = require('./src/routes/index');

require("dotenv").config({
    path: "./config.env"
});

//express object
const app = express();
//Server port
const port = process.env.PORT || 5000;

//To allow only to specified origin
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200, //for legacy browser; default is 204
};

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
//Connect with MongoDB using Cluster url defined in env variable
app.listen(port, () => {
    //Connect to DB
    databaseConn.connectDb(process.env.ATLAS_URI);

    console.log(`Server is running on port: ${port}`);
})