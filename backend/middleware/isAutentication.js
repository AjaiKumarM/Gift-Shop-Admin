const UserModal = require("../models/UserModal");
const ErrorHandling = require("../utils/errorHandling");
const AsyncError = require("./AsyncError");
const Jwt = require("jsonwebtoken")

exports.isAuthentication = AsyncError(async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandling("Please Login to use this Resourse",400))
    }
    const decode = Jwt.verify(token,process.env.JWT_SECRET);

    req.user = await UserModal.findById(decode.id);

    next();
})

exports.AuthorizationAdmin = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandling("Access Only Authorized person",401))
        }

        next()
    }
}