const jwt=require("jsonwebtoken")
const { errorResponse, successResponse } = require("../utils/response")
require("dotenv").config()
exports. verifyjwt=(req,res,next)=>{
    try {
        const token=req.body?.token||req.cookies.token
        if(!token){
             return errorResponse(res,"token is not fetched from cookies",null)
        } 
        // console.log("token printing-->",token)
      try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        // console.log("payload printing",payload)
        req.user=payload
        // console.log("req.user printing-->",req.user)
      } catch (error) {
         return errorResponse(res,"error in verfying the token ",error)
      }
  next();
        
    } catch (error) {
        console.log(error)
        return errorResponse(res,"error occurs in verfying the jwt ",error)
        
    }  
}