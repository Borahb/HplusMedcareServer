const asynchandler = require("express-async-handler")
const async = require("async")
const Cart = require("../models/cartModel")




//@desc initialize cart
//@route POST /hserver/order/
//@access private
const initializecart = asynchandler(async(req,res)=>{
    Cart.findOneAndUpdate(
        { user_id: req.user.user.id },
        {$push: {
            products:[],
          }
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


//@desc add to cart
//@api POST hserver/medicine/cart
//acess private

const addtoCart = asynchandler(async(req,res)=>{
    const {products} = req.body


    if (!req.user.user.id){
        res.status(400)
        throw new Error("UserId Required")
    }

    Cart.findOneAndUpdate(
        { user_id: req.user.user.id },
        {$push: {
            products:products,
          }
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

//@desc get cart
//@api GET hserver/medicine/cart
//acess private

const getCart = asynchandler(async(req,res)=>{

    Cart.findOne({user_id: req.user.user.id})
    .populate({
        path:"products",
        populate: {
            path:"product",
            model: "Medicine",
            select: "Name Manufacturer_name Type Pack_size_label Price Short_composition Is_discontinued",
        }   
    
    })
    .then((response)=>{
        res.json({response})
    })
    .catch((err)=>{
        throw new Error(err)
    })
    
})

//@desc remove cart
//@api DELETE hserver/medicine/cart
//acess private

const removeCartItem = asynchandler(async(req, res)=>{
    const {productId} = req.body
    
    //console.log(req.user._id)
    if(productId){
        Cart.findOneAndUpdate(
            { user: req.user._id },
            {
                $pull:{
                    products:{
                        product:productId
                    }
                }
            }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
              res.status(202).json({ result });
            }
          });
    }
})




module.exports =  {addtoCart,getCart,removeCartItem,initializecart};