const UserAddress = require("../models/addressModel")
const asynchandler = require("express-async-handler")
const async = require("async")

//@desc initialize address
//@route POST /hserver/order/initaddress
//@access private
const initializeaddress = asynchandler(async(req,res)=>{
    
  UserAddress.findOneAndUpdate(
      { user_id: req.user.user.id },
      {
        $push: {
          address:[],
        },
      },
      { new: true, upsert: true }
    ).exec((error, orders) => {
      if (error) {
          throw new Error(error)};
      if (orders) {
        res.status(201).json({ orders });
      }
    });

})


//@desc add address
//@api POST hserver/user/address
//acess private

const addAddress = asynchandler(async(req,res)=>{
const { payload } = req.body;
  if (payload.address) {
    if (payload.address._id) {
      UserAddress.findOneAndUpdate(
        { user_id: req.user.user.id, "address._id": payload.address._id },
        {
          $set: {
            "address.$": payload.address,
          },
        }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    } else {
      UserAddress.findOneAndUpdate(
        { user_id: req.user.user.id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }

    
})


//@desc get address
//@api GET hserver/user/address
//acess private

const getAddress = asynchandler(async(req,res)=>{
    UserAddress.findOne({user_id: req.user.user.id})
    .then((response)=>{
        res.json({response})
    }).catch((err)=>{
        throw new Error(err)
    })
    
        
    })

//@desc delete address
//@api DELETE hserver/user/address
//acess private

const removeAddress = asynchandler(async(req,res)=>{
  const { payload } = req.body;
  UserAddress.findOneAndUpdate(
    { user_id: req.user.user.id },
    {
      $pull: {
        address: {
          "_id": payload.address._id 
        },
      },
    },
    { new: true, upsert: true }
  ).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(201).json({ address });
    }
  });
  
      
  })

module.exports = {addAddress,getAddress,initializeaddress,removeAddress}
