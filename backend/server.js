const app = require("./app");
const path = require("path");
const dotenv = require("dotenv");
const ConnectDBserver = require("./config/database");

dotenv.config({path:path.join(__dirname,"config/config.env")})

//Connect MongoDB server
ConnectDBserver()

//Creating local server

const server =  app.listen(process.env.PORT || 6000,()=>{
    console.log(`Lisening to the Port ${process.env.PORT} And Environment = ${process.env.NODE_ENV}`);
})

//unHandled Catch Error
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log("Shutdown due to Unhandled Rejection error");   
    
})

//Handling Unhandled caught Error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log('ShutDown due to Uncaught Error');
})