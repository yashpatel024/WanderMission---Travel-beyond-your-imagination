const userRoute = require('./userroutes');
const serviceRoute = require('./servicerouter');
const serviceFeedbackRoute = require('./servicefeedbacksrouter');
const agencyRoute = require("./agencyrouter");
const userCartRoute = require("./usercartrouter");

module.exports = {
    userRoute,
    serviceRoute,
    serviceFeedbackRoute,
    agencyRoute,
    userCartRoute
};