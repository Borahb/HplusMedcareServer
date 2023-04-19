const mongoose = require("mongoose")


const prescriptionSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    prescription:[
        {
            image:{
                type:String,
                required:true      
                }
        }
    ]
});


module.exports = mongoose.model("UserPrescription", prescriptionSchema)