const express = require("express")
const { addtoCart,getCart } = require("../controller/cartController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

router.use(validateToken)
router.post("/",addtoCart)
router.get("/",getCart)


module.exports = router;