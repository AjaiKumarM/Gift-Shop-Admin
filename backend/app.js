const express = require("express");
const app = express();
const product = require("./routes/ProductsRoutes");
const errorHandling = require("./middleware/ErrorMiddleware")
const UserRoutes = require("./routes/UserAuthRoutes");
const CookieParser = require("cookie-parser");
const order = require("./routes/orderRoutes");
const payment = require("./routes/PaymentRoute");
const cors = require("cors");
const path = require('path')
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const {engine} = require("express-handlebars");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

//Assigning Static Folder
app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.engine('hbs',engine({extname:".hbs",defaultLayout:false}))
app.set("view engine","hbs");
app.set('views',"./views")

app.use(bodyParser.json())

//Allows Cookie Parser
app.use(CookieParser())

//Allow Json data MiddleWare
app.use(express.json())


app.use(cors({origin:"http://13.53.123.253:8000",credentials:true,optionsSuccessStatus:200}))


//Product Routes
app.use('/api/v1',product)

//User Routes
app.use('/api/v1',UserRoutes)

//Order Routes
app.use("/api/v1",order)

//Payment Routes 
app.use("/api/v1",payment)

//Error Handling Middleware 
app.use(errorHandling)


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"../gift-shop-admin/build")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../gift-shop-admin/build/index.html"))
  })
}



module.exports = app