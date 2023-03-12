const {createOrder,updateOrder,getOrders} = require("../controller/orderController")
const express = require("express")
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");




router.use(validateToken)
router.post("/",createOrder )
router.put("/",updateOrder )
router.get("/",getOrders)


module.exports = router;