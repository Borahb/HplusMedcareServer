const asynchandler = require("express-async-handler")
const async = require("async")
const prescription = require('../models/prescriptionModel')



//@desc initialize prescription
//@route POST /hserver/user/prescription
//@access private
const initiprescriptionupload = asynchandler(async(req,res)=>{
    prescription.findOneAndUpdate(
        {user_id: req.user.user.id},
        {$push: {
            prescription:[],
          }
        },
        { new: true, upsert: true }
      ).exec((error, userprescription) => {
        if (error) {
            throw new Error(error)};
        if (userprescription) {
          res.status(201).json({ userprescription });
        }
      });

})

//@desc upload prescription
//@route POST /hserver/user/prescription
//@access private

const uploadPrescription = asynchandler(async(req,res)=>{

    const filename = req.file.filename
    console.log(filename)
    const basePath = `${req.protocol}://${req.get('host')}/user/prescription/`


    
    prescription.findOneAndUpdate(
        {user_id: req.user.user.id},
        {$push: {
            prescription: {
              image:`${basePath + filename}`
            },
          }
        },
        { new: true, upsert: true }
      ).exec((error, userprescription) => {
        if (error) {
            res.status(400);
            throw new Error(error)};
        if (userprescription) {
          res.status(201).json({ userprescription });
        }
      });
    }


)

const getuserPrescription = asynchandler(async(req,res)=>{
    prescription.findOne({user_id: req.user.user.id}).then((userprescription)=>{
        res.json({userprescription})
    })


})




module.exports = {uploadPrescription,initiprescriptionupload,getuserPrescription};
