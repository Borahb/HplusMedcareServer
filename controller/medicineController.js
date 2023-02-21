const asyncHandler = require("express-async-handler")
const Medicine = require("../models/medicineModel")

//@desc get all medicine
//@route GET /hserver/medicine
//@access public

const getMedicine = asyncHandler(async(req,res)=>{
    const medicine = await Medicine.find()
    res.status(200).json({medicine})
})

//@desc get  medicine by id
//@route GET /hserver/medicine
//@access public

const getMedicinebyid = asyncHandler(async(req,res)=>{
    const medicine = await Medicine.findById(req.params.id)
    if(!medicine){
        res.statusCode(404)
        throw new Error("Medicine not found")
    }
    res.json({medicine})
})

//@desc get medicine by name
//@route GET /hserver/medicine
//@access public

const getMedicinebyname = asyncHandler(async(req,res)=>{
    const medicine = await Medicine.find({Name:req.params.name})
    if(!medicine){
        res.statusCode(404)
        throw new Error("Medicine not found")
    }
    res.json({medicine})
})

//@desc insert medicine
//@route POST /hserver/medicine
//@access public

const insertMedicine = asyncHandler(async(req,res)=>{
    console.log("req body:",req.body)
    const {
        name,
        manufacturer_name,
        pack_size_label,
        price,
        short_composition, 
        is_discontinued} = req.body
    if (!name ||
        !manufacturer_name ||
        !pack_size_label ||
        !price||
        !short_composition ||
        !is_discontinued ){
            res.status(400)
            throw new Error('All fields are mandatory')
        }
    const medicine = await Medicine.create({
        name,
        manufacturer_name,
        pack_size_label,
        price,
        short_composition, 
        is_discontinued
    })

    res.json({medicine})
})

//@desc edit medicine
//@route PUT /hserver/medicine
//@access public

const editMedicine = asyncHandler(async(req,res)=>{
   const medicine = await Medicine.findById(req.params.id)
   if(!medicine){
    res.statusCode(404)
    throw new Error("Medicine not found")
   }

   const updatedMed = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new:true
    }
   )

   res.json({updatedMed})
})

//@desc delete medicine
//@route DELETE /hserver/medicine
//@access public

const deleteMedicine = asyncHandler(async(req,res)=>{
    const medicine = await Medicine.findById(req.params.id)
   if(!medicine){
    res.statusCode(404)
    throw new Error("Medicine not found")
   }
   await Medicine.deleteOne({_id : req.params.id})
   res.json({medicine})
})



module.exports = {getMedicine, getMedicinebyid, getMedicinebyname, insertMedicine, editMedicine, deleteMedicine}