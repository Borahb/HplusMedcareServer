const {createOrder,updateOrder,getOrders,initializeOrder} = require("../controller/orderController")
const express = require("express")
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");




router.use(validateToken)
router.post("/",createOrder )
router.post("/initOrder",initializeOrder)
router.put("/",updateOrder )
router.get("/",getOrders)


module.exports = router;