const express = require("express");
const { GetAllProducts, CreateProduct, GetSingleProduct, UpdateProduct, DeleteProductCon, CreateProductReview, GetAllProductReviews, AdminDeleteProductReviews, HomeSectionDetails, GetAllAdminPoducts, TexMail } = require("../controller/ProductControllers");
const { isAuthentication, AuthorizationAdmin } = require("../middleware/isAutentication");
const routes = express.Router();
const multer = require("multer");
const path = require("path")

const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"..","/uploads/products"))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

//Get Product Routes
routes.route("/products").get(GetAllProducts);

//Admin: Create Product Route
routes.route("/product/create").post(isAuthentication,AuthorizationAdmin("admin"),upload.array('images'),CreateProduct);

//Get Single product
routes.route("/product/:id").get(GetSingleProduct)

//Create Product Review
routes.route("/product/review").post(isAuthentication,CreateProductReview)

//Get All product Reviews
routes.route("/product/all/reviews").get(isAuthentication,GetAllProductReviews)

//Delete Product Reviews
routes.route("/product/delete/review").delete(isAuthentication,AuthorizationAdmin("admin"),AdminDeleteProductReviews)

//admin Update Product 
routes.route('/product/update/:id').post(isAuthentication,AuthorizationAdmin("admin"),upload.array('ima'),UpdateProduct)

//admin Delete Product Route
.delete(isAuthentication,AuthorizationAdmin("admin"),DeleteProductCon);

//Admin All products List
routes.route('/admin/all/products').get(isAuthentication,AuthorizationAdmin("admin"),GetAllAdminPoducts)


//Home Section Route

routes.route("/home/product").get(HomeSectionDetails)

routes.route('/for').get(TexMail)



module.exports = routes;