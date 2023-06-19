const express = require("express");
const { isAuthentication, AuthorizationAdmin } = require("../middleware/isAutentication");
const { CreateOrder, GetSingleOrder, GetUserAllOrders, AdminUpdateOrder, AdminDeleteOrder, isStockIsAvailable, DashboardDetails, AdminOrderDetails } = require("../controller/OrderControllers");
const routes = express.Router();




//Create order routes 
routes.route("/order/create").post(isAuthentication,CreateOrder);

//Get Single order
routes.route("/single/order/:id").get(isAuthentication,GetSingleOrder);

//Get user all orders
routes.route("/all/order").get(isAuthentication,GetUserAllOrders);

//Is Stock Available route
routes.route('/product/stock').post(isStockIsAvailable)


//Admin
//Update order status
routes.route("/admin/update/order/:id").put(isAuthentication,AuthorizationAdmin("admin"),AdminUpdateOrder);

//Delete order
routes.route("/admin/delete/order/:id").delete(isAuthentication,AuthorizationAdmin("admin"),AdminDeleteOrder)

//Dashboard roust
routes.route("/admin/dashboard").get(isAuthentication,AuthorizationAdmin("admin"),DashboardDetails)

//Admin Orders Route 
routes.route("/admin/orders").get(isAuthentication,AuthorizationAdmin('admin'),AdminOrderDetails)



module.exports = routes