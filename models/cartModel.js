const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please add medicine name"]
    },
    pack_size_label:{
        type: String,
        required: [true,"Please add pack size label"]
    },
    price:{
        type: String,
        required: [true,"Please add price"]
    },
    product_id:{
        type: String,
        required: [true,"Please add product id"]
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
})


module.exports = mongoose.model("Cart",cartSchema);