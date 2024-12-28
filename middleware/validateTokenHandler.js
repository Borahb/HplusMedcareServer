const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const validateToken = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    // token=authHeader.split(" ")[1]
    // res.json({token:token})
    if (authHeader && authHeader.startsWith("Bearer")) {
        console.log('inside bearer');
        token = authHeader.split(" ")[1]
        //res.json({token:token})
        if (!token) {
            res.statusCode(401)
            return res.status(401).json({ message: "Token is missing" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            console.log('error' + err);
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            if (!decoded) {
                res.status(400)
                return res.status(401).json({ message: "User is not authorized" });
            }

            req.user = decoded
            //res.json(req.user.user)
            next()
        })
    }
})


module.exports = validateToken;