const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const validateToken = asyncHandler(async(req,res,next)=>{
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    // token=authHeader.split(" ")[1]
    // res.json({token:token})
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        //res.json({token:token})
        jwt.verify(token, process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.statusCode(401)
                throw new Error("Token not valid")
            }
            req.user = decoded
            //res.json({decoded})
            next()
        })
        //req.user = decoded
        //res.json({decoded})
        //next()
        // if(!decoded){
        //     res.status(400)
        //     throw new Error("User is not authorized")
        // }

        if(!token){
            res.statusCode(401)
            throw new Error("User is not authorized or token is missing")
        }
    }
})


module.exports = validateToken;