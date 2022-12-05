const express = require('express');
const app = express();
const cors = require('cors');
const databaseConn = require('./src/database/conn');
const routes = require('./src/routes/index');

require("dotenv").config({
    path: "./config.env"
});

const port = process.env.PORT || 5000;

//disabling "x-powered-by", so requester doesn't know we are using express
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:true }));

//Routing
const apirouter = express.Router();
app.use('/wandermission', apirouter);
apirouter.use('/user', routes.userRoute);
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