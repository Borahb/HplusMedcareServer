const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["Home", "Work","Other"],
    required: true,
  },
});

const orderSchema = mongoose.Schema({
    user_id :{
        type:String,
        required:true,
    },
    orders :[
      {
        products:[
          {
              product:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref: "Medicine",
                  required:true,
              },
              amount:{
                  type: Number,
                  required:true,
              },
              qty:{
                  type:Number,
                  required:true
              }
          }
      ],
      grandTotal:{
          type:Number,
          required:true
      },
      shippingDetails: addressSchema,
      paymentMode:{
        type:String,
        required: true,
      },
      orderStatus:{
          type:String,
          required: true,
      },
      transactionId:{
          type:String,
      }  
      }
    ]
},
{timestamps:true}
)


module.exports = mongoose.model("Order",orderSchema);