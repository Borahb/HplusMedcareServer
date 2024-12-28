const express = require("express")
const router = express.Router()
const {registerUser, loginUser, currentUser, refreshToken} = require("../controller/userController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register",registerUser)

router.post("/login", loginUser )

router.post("/refresh-token",validateToken ,refreshToken)

router.get("/current",validateToken ,currentUser)


module.exports = router