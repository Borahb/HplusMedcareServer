const express = require("express")
const { addtoCart,getCart,removeCartItem } = require("../controller/cartController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

router.use(validateToken)
router.post("/",addtoCart)
router.get("/",getCart)
router.delete("/",removeCartItem)


module.exports = router;