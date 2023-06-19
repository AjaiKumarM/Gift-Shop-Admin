const mongoose = require("mongoose");
const validator = require("email-validator");


const AuthenticationScema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the name"]
    },
    email:{
        type:String,
        required:[true,'Please enter the email id'],
        unique: [true, "Email id Already Register"],
        lowercase: true,
        trim: true,
        validate: [validator.validate, "Please Enter the Valid Email id"],
    },
    code:{
        type:Number,
        default:0
    },
    codeExpireCount:{
        type:Number,
        default:0
    },
    codeExpireDate:Date

})

const AuthenticationModal = mongoose.model("authentication",AuthenticationScema)

module.exports = AuthenticationModal