const asynchandler = require("express-async-handler")
const Cart = require("../models/cartModel")
//@desc add to cart
//@api POST hserver/medicine/cart
//acess private

const addtoCart = asynchandler(async(req,res)=>{
    const {name, pack_size_label, price, product_id} = req.body
    if (!name || !pack_size_label || !price || !product_id){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const cart = await Cart.create({
        name,
        pack_size_label,
        price,
        product_id,
        user_id : req.user.user.id
    })

    res.status(200).json({cart})
})

//@desc get cart
//@api POST hserver/medicine/cart
//acess private

const getCart = asynchandler(async(req,res)=>{
    const cart = await Cart.find({user_id: req.user.user.id})
    res.status(200).json({cart})
    //console.log(req.user.user.id)
})


module.exports =  {addtoCart,getCart};