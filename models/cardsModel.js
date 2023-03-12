const mongoose = require("mongoose");


const cards = mongoose.Schema({
    cardName:{
        type:String,
        required:false,
    },
    cardNumber:{
        type:String,
        required:true,
        unique:true,
    },
    cardExpYear:{
        type:String,
        required:true
    },
    cardCVC:{
        type:String,
        required:true,
    },
    customerId:{
        type:String,
        required:true
    },
    cardId:{
        type:String,
        required:true,
    }
},{timestamps:true}
)

module.exports = mongoose.model("CustomerCard",cards);