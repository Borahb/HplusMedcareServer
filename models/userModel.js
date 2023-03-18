const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter name"]
    },
    email:{
        type:String,
        required:[true, "Please enter email"],
        unique: [true,"Email address already registered"]
    },
    contact:{
        type:String,
        required:[true, "Please enter phonenumber"]
    },
    password:{
        type:String,
        required:[true, "Please enter password"]
    },
    stripeCustomerID:{
        type:String,
    } 
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema);