const express = require("express");
const {uploadPrescription,initiprescriptionupload,getuserPrescription} = require("../controller/prescriptionuploadController");
const validateToken = require("../middleware/validateTokenHandler")
const upload  = require("../middleware/uploadHandler")
const router = express.Router();


router.use(validateToken);
router.post('/prescription',upload.single('image'),uploadPrescription)
.post('/initprescription',initiprescriptionupload)
.get('/prescription',getuserPrescription)


module.exports = router;

