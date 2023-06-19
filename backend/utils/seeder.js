const ProductModal = require("../models/ProductModal")
const productData = require("../data/productData.json")
const connectDataBase = require("../config/database")
const dotenv = require("dotenv");
const path = require("path")


// //config Dotenv Environment configration
// dotenv.config({path:path.join(__dirname,"..","config/config.env")})

//connect data base
connectDataBase()

const SeedProductData =async ()=>{

    try {
        await ProductModal.deleteMany();
        console.log("Product Deleted");
        await ProductModal.insertMany(productData,{})
        console.log("Product Added")
    } catch (error) {
        console.log(error);
    }

    process.exit()
}
SeedProductData()
