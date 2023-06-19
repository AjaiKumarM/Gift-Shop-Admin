
const express = require("express");
const { isAuthentication } = require("../middleware/isAutentication");
const { SendPaymentDetails, VerifyPayment } = require("../controller/PaymentControllers");
const routes = express.Router();


//Sent Payment deatls route 
routes.route("/payment/confirmation").post(isAuthentication,SendPaymentDetails)

//Verify Payment 
routes.route("/payment/verify").post(isAuthentication,VerifyPayment)




module.exports = routes