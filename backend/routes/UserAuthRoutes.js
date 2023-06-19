
const express = require("express");
const { RegisterAuth, LoginAuth, LogoutUser, forgotPasswordMess, ResetPassword, ChangePassword, GetAllUserProfile, UpdateUserProfile, GetAdminSingleProfile, AdminDeleteProfile, GetUserPofile, AddShippingInfo, RemoveShippingInfo, VerifyAuthenticationCODE } = require("../controller/UserController");
const { isAuthentication, AuthorizationAdmin } = require("../middleware/isAutentication");
const routes = express.Router();


//Register Authentication
routes.route("/user/register").post(RegisterAuth);

//Verification email
routes.route("/user/verify/email").post(VerifyAuthenticationCODE)

//Login Authentication
routes.route("/user/login").post(LoginAuth);

//Logout User 
routes.route("/user/logout").get(LogoutUser);

//Forgot Password 
routes.route("/user/forgot/password").post(forgotPasswordMess)

//Reset password token 
routes.route("/user/reset/password/:token").post(ResetPassword)

//Get User Profile
routes.route("/user/profile").get(isAuthentication,GetUserPofile)

//change password route
routes.route("/user/change/password").post(isAuthentication,ChangePassword)

//Update Profile route
routes.route("/user/update/profile").put(isAuthentication,UpdateUserProfile)

//Add Shipping Info route
routes.route('/user/shipping/details').post(isAuthentication,AddShippingInfo)

//Remove shipping Info route
routes.route("/user/shipping/delete").post(isAuthentication,RemoveShippingInfo)


//Admin
//Get All User Profile
routes.route("/admin/all/profile").get(isAuthentication,AuthorizationAdmin("admin"),GetAllUserProfile)

//Get Single User Profile
routes.route("/admin/single/profile/:id").get(isAuthentication,AuthorizationAdmin("admin"),GetAdminSingleProfile)

//Delete Profile
routes.route("/admin/delete/profile/:id").delete(isAuthentication,AuthorizationAdmin("admin"),AdminDeleteProfile)


module.exports = routes