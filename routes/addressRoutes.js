const express = require("express");
const {addAddress,getAddress,initializeaddress,removeAddress} = require("../controller/addressController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
router.post('/address',addAddress)
router.post('/initaddress',initializeaddress)
router.get('/address',getAddress)
router.delete('/address',removeAddress)

module.exports = router;