const express = require("express")
const { addtoCart,getCart,removeCartItem,initializecart } = require("../controller/cartController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

router.use(validateToken)
router.post("/",addtoCart)
router.post("/initcart",initializecart)
router.get("/",getCart)
router.delete("/",removeCartItem)


module.exports = router;