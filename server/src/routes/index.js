const userRoute = require('./userroutes');
const serviceRoute = require('./servicerouter');
const serviceFeedbackRoute = require('./servicefeedbacksrouter');
const agencyRoute = require("./agencyrouter");
const userCartRoute = require("./usercartrouter");
const userOrderRoute = require("./userorderrouter");

module.exports = {
    userRoute,
    serviceRoute,
    serviceFeedbackRoute,
    agencyRoute,
    userCartRoute,
    userOrderRoute
};