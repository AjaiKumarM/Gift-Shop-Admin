const mongoose = require("mongoose");
const validator = require("email-validator")


const OrderScema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,"Please enter the Address"]
        },
        district:{
            type:String,
            required:[true]
        },
        state:{
            type:String,
            required:[true]
        },
        city:{
            type:String,
            required:[true,"please enter the city"]
        },
        phoneNo:{
            type:Number,
            required:[true,"Please enter the Phone number"]
        },
        postalCode:{
            type:Number,
            required:[true,"Please enter the Postal Code"]
        },
        fullName:{
            type:String,
            required:[true,"Please Enter the name"]
        },
        emailId:{
            type:String,
            required:[true,"Please enter the Email Id"],
            lowercase:true,
            trim:true,
            validate:[validator.validate,"Please Enter the Valid Email id"]
        },
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Products"
            }
        }
    ],

    itemsPrice:{
        type:Number,
        default:0.0
    },
    taxPrice:{
        type:Number,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        default:0.0
    },
    totalPrice:{
        type:Number,
        default:0.0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"userdetails"
    },
    paymentId:{
        type:String,
        required:true,
    },
    paidAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    },
    orderStatus:{
        type:String,
        default:"Processing"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const OrderModal = mongoose.model("orderdetails",OrderScema);

module.exports = OrderModal