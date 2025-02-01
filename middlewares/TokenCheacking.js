const { errorResponse } = require("../utils/response")
const { verifyParams } = require("./BaseApiController")



exports. VerifyToken=async(req,res,next)=>{
    try {
        
       const data=req.body
        const verify=await verifyParams(res,data)
        if(verify){
            return
        }
        next()
    } catch (error) {
        console.log(error)
        return errorResponse(res,"Token is not verifying tctoken and Device_type required")
        
    }
}