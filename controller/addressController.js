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

const addAddress = asynchandler(async (req, res) => {
  const {
    name,
    mobileNumber,
    pinCode,
    locality,
    address,
    addressType,
    _id,
  } = req.body;

  if (!name || !mobileNumber || !pinCode || !locality || !address || !addressType) {
    return res.status(400).json({ error: "All address fields are required" });
  }

  const newAddress = { name, mobileNumber, pinCode, locality, address, addressType };

  if (_id) {
    // Update an existing address
    UserAddress.findOneAndUpdate(
      { user_id: req.user.user.id, "address._id": _id },
      {
        $set: {
          "address.$": newAddress,
        },
      },
      { new: true }
    ).exec((error, updatedAddress) => {
      if (error) return res.status(400).json({ error });
      if (updatedAddress) {
        return res.status(200).json({ address: updatedAddress });
      } else {
        return res.status(404).json({ error: "Address not found" });
      }
    });
  } else {
    // Add a new address
    UserAddress.findOneAndUpdate(
      { user_id: req.user.user.id },
      {
        $push: {
          address: newAddress,
        },
      },
      { new: true, upsert: true }
    ).exec((error, createdAddress) => {
      if (error) return res.status(400).json({ error });
      if (createdAddress) {
        return res.status(201).json({ address: createdAddress });
      }
    });
  }
});



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

const removeAddress = asynchandler(async (req, res) => {
  const { addressId } = req.query; // Extracting addressId from query parameters

  if (!addressId) {
    return res.status(400).json({ error: "Address ID is required" });
  }

  UserAddress.findOneAndUpdate(
    { user_id: req.user.user.id },
    {
      $pull: {
        address: {
          "_id": addressId,
        },
      },
    },
    { new: true, upsert: true }
  ).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(200).json({ address });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  });
});


module.exports = {addAddress,getAddress,initializeaddress,removeAddress}
