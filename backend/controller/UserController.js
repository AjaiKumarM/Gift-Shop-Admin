const { default: mongoose } = require("mongoose");
const AsyncError = require("../middleware/AsyncError");
const GetJwtResponse = require("../middleware/GetjwtResponse")
const UserModal = require("../models/UserModal");
const EmailSender = require("../utils/EmailSend");
const ErrorHandling = require("../utils/errorHandling");
const crypto = require("crypto");
const AuthenticationModal = require("../models/AuthenticationModal");
const OTPverification = require("../utils/OtpVerfication");


//Register Authentication -> api/v1/user/register
exports.RegisterAuth = AsyncError(async (req,res,next)=>{

    const {name,email} = req.body;

    const user = await UserModal.findOne({email})

    if(user){
        return next(new ErrorHandling("You entered email id already registered",400))
    }
    const verify = await AuthenticationModal.findOne({email})

    if(verify){
        const otp = Math.floor(100000 + Math.random() * 900000)
        const date = Date.now() + 10 * 60 * 1000
        verify.code = otp
        verify.codeExpireDate = date
        await verify.save({validateBeforeSave:false})

        OTPverification({email,name,otp})

        res.status(200).json({
            success:true,
        })
    }else{
        const otp = Math.floor(100000 + Math.random() * 900000)
        const date = Date.now() + 10 * 60 * 1000

        const newVerify = await AuthenticationModal.create({
            name,
            email,
            code:otp,
            codeExpireDate:date
        })

        OTPverification({email,name,otp})

        res.status(200).json({
            success:true,
        })
    }

})

//Verfiy Authentication code -> api/v1/user/verify/auth

exports.VerifyAuthenticationCODE = AsyncError(async (req,res,next)=>{
    const {name,email,password,otp} = req.body;

    const verify = await AuthenticationModal.findOne({email,codeExpireDate:{$gt:Date.now()}})


    if(!verify){
        return next(new ErrorHandling("Your Enter verification code is Expied or Invaild",400))
    }
    if(verify.codeExpireCount === 3){
        await AuthenticationModal.findByIdAndDelete(verify.id)
        return next(new ErrorHandling("Your try more than 3 times please try again later",400))
    }
    if(verify.code.toString() !== otp){
        verify.codeExpireCount = verify.codeExpireCount + 1;
        await verify.save({validateBeforeSave:false})
        return next(new ErrorHandling("Please Enter valid Verification code",400))
    }

    await AuthenticationModal.findByIdAndDelete(verify.id)

    const user = await UserModal.create({name,email,password})

    const users = await UserModal.findById(user.id).select("-password")

    GetJwtResponse(users,200,res)

})

//Login Authentication -> api/v1/user/login

exports.LoginAuth = AsyncError(async (req,res,next)=>{
    const {email,password} = req.body

    //Check email and password user entered
    if(!email || !password){
        return next(new ErrorHandling("Please enter and password",400))
    }

    const user = await UserModal.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandling("Invalid Email and Password",401))
    }
    const isPassCorrect = await user.getValidPassword(password)

    if(!isPassCorrect){
        return next(new ErrorHandling("Invalid Email And Password",401))
    }

    const users = await UserModal.findById(user.id.toString()).select("-password")

    GetJwtResponse(users,200,res)

})

//Logout User User Api -> api/v1/user/logout
exports.LogoutUser = AsyncError(async (req,res,next)=>{
    
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})
    .status(200)
    .json({
        success:true,
        message:"Logout SuccessFully"
    })

})

// Forgot password user api -> api/v1/user/forgot/password

exports.forgotPasswordMess = AsyncError(async (req,res,next)=>{
    const user = await UserModal.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandling("Invalid Email Please Enter the valid email Id"))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave:false});

    let BASE_URL = process.env.FRONT_END_URL

    if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get("host")}`
    }

    const resetUrl = `${BASE_URL}/reset/password/${resetToken}`

    try {
        EmailSender({
            email:user.email,
            subject:"Gift Shop Reset password",
            resetUrl
        })

        res.status(200).json({
            success:true,
            message:`Forgot password Email send to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
       await user.save({validateBeforeSave:false});
        return next(new ErrorHandling(error.message,401))
    }
})

//Reset password -> api/v1/reset/password

exports.ResetPassword = AsyncError(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await UserModal.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()
        }
    })

    if(!user){
        return next(new ErrorHandling("Reset password token invalid or expired",401))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandling("New Password and Confirm Password is dose not match",400))
    }

    console.log(req.body.newPassword);

    user.password = req.body.newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
   await user.save({validateBeforeSave:false})

    const users = await UserModal.findById(user.id.toString()).select("-password")

    GetJwtResponse(users,201,res)

})

//Change Password -> api/v1/user/change/password

exports.ChangePassword = AsyncError(async (req,res,next)=>{
    const users = await UserModal.findById(req.user.id).select("+password")

    
    const currentPassword  = await users.getValidPassword(req.body.currentPassword)

    if(!currentPassword){
        return next(new ErrorHandling("Your entered current password is Incorrect",401))
    }
    if(!req.body.newPassword){
        return next(new ErrorHandling("Please enter new password",400))
    }

    users.password = req.body.newPassword
    await users.save({validateBeforeSave:false})

    const user = await UserModal.findById(users.id.toString()).select("-password")

    res.status(200).json({
        success:true,
        user
    })
})

//Get User Profile -> api/v1/user/profile

exports.GetUserPofile = AsyncError(async (req,res,next)=>{
    const user = await UserModal.findById(req.user.id).select("-password")


    res.status(200).json({
        success:true,
        user
    })
})


//Update Profile -> api/v1/user/update/profile
exports.UpdateUserProfile = AsyncError(async (req,res,next)=>{

    const {name,email} = req.body
    if(!name){
        return next(new ErrorHandling("Please Enter the name",400))
    }
    if(!email){
        return next(new ErrorHandling("Please enter the Email id",400))
    }

    const user = await UserModal.findByIdAndUpdate(req.user.id,{name:name,email:email},{new:true,runValidators:true})

    res.status(200).json({
        success:true,
        user
    })
})

//ShippingInfo -> aip/v1/user/shipping/details

exports.AddShippingInfo = AsyncError(async (req,res,next)=>{
    const {shippingInfo} = req.body

    const user = await UserModal.findById(req.user.id)

    user.shippingInfo.push(shippingInfo);
    user.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
})

//Remove Shipping info -> api/v1/user/remove/shipping
exports.RemoveShippingInfo = AsyncError(async (req,res,next)=>{
    const {shippingInfo} = req.body

    const user = await UserModal.findById(req.user.id)

    user.shippingInfo = shippingInfo;
    await user.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        user
    })
})

//Admin : Get All Profile Data -> api/v1/admin/all/profile

exports.GetAllUserProfile = AsyncError(async (req,res,next)=>{
    const AllUser = await UserModal.find();

    const newUser = AllUser.filter((user)=>new Date(user.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000).length

    res.status(200).json({
        success:true,
        newUser,
        count :AllUser.length,
        AllUser
    })
})

//Admin: Get Specific Profile -> api/v1/admin/single/profile/:id
exports.GetAdminSingleProfile = AsyncError(async (req,res,next)=>{
    const singleUser = await UserModal.findById(req.params.id)

    if(!singleUser){
        return next(new ErrorHandling("User Not found",401))
    }

    res.status(200).json({
        success:true,
        singleUser
    })
})

//Admin: Delete Profile -> api/v1/admin/delete/profile/:id
exports.AdminDeleteProfile = AsyncError(async (req,res,next)=>{
    const user = await UserModal.findById(req.params.id);

    if(!user){
        return next(new ErrorHandling("User not found",400))
    }

    await UserModal.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Profile deleted successFully"
    })
})