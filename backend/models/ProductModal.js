
const mongoose = require("mongoose");


const ProductShcema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Product name"],
        trim:true,
        maxLength:[100,"Product name should be less than 100 characters"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please Enter the description"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:[true,"Please Upload the image"]
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please select the category"],
        enum:{
            values:[
                "Accessories",
                "Cards",
                "Clothing",
                "Jewelries",
                "Handbages",
                "Office & Stationary",
                "Toys",
                "Wallets"
            ]
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter the seller name"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        minimum:0,
        required:[true,"Please enter the product stock"],
        maxLength:[20,"Product stock should less than 20"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            name:{
                type:String,
                required:[true,"Please enter the name"]
            },
            rating:{
                type:Number,
                default:0
            },
            comments:{
                type:String,
                required:[true,"Please enter the Your Comments"]
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    numOfProductBuyCount:{
        type:Number,
        default:0
    }
})

const ProductModal = mongoose.model("Products",ProductShcema)


module.exports = ProductModal