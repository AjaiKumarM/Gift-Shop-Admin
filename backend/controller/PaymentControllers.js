const AsyncError = require("../middleware/AsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const ErrorHandling = require("../utils/errorHandling");
const { CreateOrder } = require("./OrderControllers");
const ProductModal = require("../models/ProductModal");




exports.SendPaymentDetails = AsyncError(async(req,res,next)=>{

    const intence = new Razorpay({
        key_id:process.env.RAZO_KEY_ID,
        key_secret:process.env.RAZO_SECRET_KEY
    })

    const options = {
        amount:req.body.amount * 100,
        currency:"INR",
        receipt: crypto.randomBytes(10).toString("hex")
    }

    const orderItems = req.body.cartItems;
    const productsIds = orderItems.map((item)=>{return item.productId})
    const products = await ProductModal.find({
      _id: {
        $in: productsIds,
      },
    });
  
    const stock = products.find((product)=>{
       if(Number(product.stock) <= 0){
          return true
      }
    })
  
    if(stock){
      return next(new ErrorHandling(`Sorry the ${stock.name} is out of stock`))
    }else{
        intence.orders.create(options,(err,response)=>{
            if(err){
                return next(new ErrorHandling("Internal server error",501))
            }else{
                res.status(200).json({
                    success:true,
                    data:response,
                    id:process.env.RAZO_KEY_ID
                })
            }
        })
    }


})

exports.VerifyPayment = AsyncError(async (req,res,next)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto.createHmac("sha256",process.env.RAZO_SECRET_KEY).update(sign.toString()).digest("hex");

    if(razorpay_signature === expectedSign){
        CreateOrder(req,res,next)
    }else{
        return next(new ErrorHandling("Invalid signature send",400))
    }
})