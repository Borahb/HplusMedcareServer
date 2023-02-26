const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
                required:true
            },
            qty :{
                type: Number,
                required: true
            }
        }
    ]
},{
    toJSON:{
        transform: function (model, ret){
            ret.cartId = ret._id.toString(),
            delete ret._id;
            delete ret._v;
        }
    }
},
{
    timestamps:true
}
)


module.exports = mongoose.model("Cart",cartSchema);