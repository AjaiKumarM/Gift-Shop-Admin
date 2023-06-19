const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("nodemailer-express-handlebars")

//Config Dot env 
dotenv.config({path:path.join(__dirname,"..","config/config.env")})

const EmailSender = async options => {

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
    to:options.email,
    subject:options.subject,
    template:"forgot",
    attachments:[{
      filename:"gift.png",
      path:path.join(__dirname,"..","/logo/gift.png"),
      cid:"gift"
    }],
    context:{
      link:options.resetUrl
    }
  }

  await transporter.sendMail(message)

  transporter.verify((err,success)=>{
    if(err){
      console.log(err);
    }
  })
};


module.exports = EmailSender;
