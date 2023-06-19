const GetJwtResponse = (user,statuscode,res)=>{

    //Cookie options
    const options = {
        expires:new Date(Date.now() + process.env.COOOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:"lax",
        path:"/",
        secure:false
    }

    //Token genrator 
    const token = user.GetJwtToken()

    res.status(statuscode).cookie("token",token,options).json({
        success:true,
        user
    })
}

module.exports = GetJwtResponse;