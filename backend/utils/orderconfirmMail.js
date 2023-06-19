const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("nodemailer-express-handlebars")
const date = require("date-and-time")


//Config Dot env 
dotenv.config({path:path.join(__dirname,"..","config/config.env")})


const OrderConfirmEmail = async options => {

  console.log(options.link);

    const transport = {
      service:"gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
  
    const handlebarsOptions = {
      viewEngine:{
        extName:".hbs",
        partialsDir:path.resolve('./views'),
        defaultLayout:false,
      },
      viewPath:path.resolve('./views'),
      extName:".hbs"
  
    }
  
  
    const transporter = nodemailer.createTransport(transport);
  
    transporter.use("compile",hbs(handlebarsOptions))
  
    const message = {
      from: `${process.env.SMTP_FROM_USER} <noreply@giftshop.com>`,
      to:options.order.user.email,
      subject:"Order Confirmation",
      template:"orderconfirm",
      attachments:[{
        filename:"gift.png",
        path:path.join(__dirname,"..","/logo/gift.png"),
        cid:"gift"
      }],

      
      context:{
        link:options.link,
        orderId:String(options.order._id).substring(0,10),
        orderDate:date.format(options.order.createdAt,"MMM DD,YYYY"),
        orderStatus:options.order.orderStatus,
        orderTotal:options.order.totalPrice,
        name:options.order.shippingInfo.fullName,
        address:options.order.shippingInfo.address,
        city:options.order.shippingInfo.city,
        district:options.order.shippingInfo.district,
        pincode:options.order.shippingInfo.postalCode,
        orderItems:options.order.orderItems,
        subtotal:options.order.itemsPrice,
        shippingPrice:options.order.shippingPrice === 0 ? "Free" :`$${options.order.shippingPrice}`,
        taxPrice:options.order.taxPrice,
        totalItems:options.order.orderItems.length,
        ShippingColor:options.order.shippingPrice === 0 ? "text-green":"text-muted"
      }
    }
  
    await transporter.sendMail(message)
  
    transporter.verify((err,success)=>{
      if(err){
        console.log(err);
      }
      if(success){
        console.log(success);
      }
    })
  };


module.exports = OrderConfirmEmail;
