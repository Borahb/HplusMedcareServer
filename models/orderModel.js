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
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      required: true,
    },
    landmark: {
      type: String,
      min: 10,
      max: 100,
    },
    alternatePhone: {
      type: String,
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work"],
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