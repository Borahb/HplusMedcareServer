const express = require("express");
const {addAddress,getAddress} = require("../controller/addressController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
router.post('/address',addAddress)
router.get('/address',getAddress)

module.exports = router;