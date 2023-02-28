const express = require('express');
const router = express.Router();
const {
    getMedicine,
    getMedicinebyid, 
    insertMedicine, 
    editMedicine, 
    deleteMedicine } = require("../controller/medicineController")

router.route("/").get(getMedicine).post(insertMedicine)
router.route("/:id").get(getMedicinebyid).put(editMedicine).delete(deleteMedicine)



module.exports = router