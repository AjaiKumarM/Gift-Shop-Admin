const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

//Dotenv Configuration
dotenv.config({path:path.join(__dirname,"config.env")})

const ConnectDBserver = ()=>{

    mongoose.connect(process.env.DB_SERVER_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=> console.log(`Mongoose connectedto the Port ${con.connection.port}`))
}


module.exports = ConnectDBserver