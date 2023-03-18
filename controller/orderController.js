const user = require("../models/userModel")
const cards = require("../models/cardsModel")
const order = require("../models/orderModel")

const stripeController = require("../controller/stripeController")
const cart = require("../models/cartModel")
const async = require("async")
const asynchandler = require("express-async-handler")

//@desc initialize order
//@route POST /hserver/order/
//@access private
const initializeOrder = asynchandler(async(req,res)=>{
    
    order.findOneAndUpdate(
        { user_id: req.user.user.id },
        {
          $push: {
            orders:[],
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




//@desc create order
//@route POST /hserver/order/
//@access private
const createOrder = asynchandler(async(req,res)=>{
    const {shippingDetails} = req.body

    if(!shippingDetails){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    var products = [];
    var grandTotal = 0;
    //var model = {};
    
    cart.findOne({user_id: req.user.user.id})
            .populate({
                path:"products",
                populate: {
                path:"product",
                model: "Medicine",
                select: "Price",
            }   
    
        })
        .then((cartDB)=>{
            cartDB.products.forEach(product=>{
            products.push({
            product: product.product._id,
            qty: product.qty,
            amount: product.product.Price * product.qty
            }) ;
            
            grandTotal += (product.product.Price * product.qty)
            });
            //console.log(model)
            //res.json({model})

            order.findOneAndUpdate(
                { user_id: req.user.user.id },
                {
                  $push: {
                    orders:{
                        products: products,
                        orderStatus:"Order in Progress",
                        grandTotal: grandTotal,
                        shippingDetails:shippingDetails
                    },
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

})


//@desc update order
//@route PUT /hserver/order/
//@access private

const updateOrder = asynchandler(async(req,res)=>{

    const {Status,transaction_id,_id} = req.body;

    var model = {
        orderStatus: Status,
        transactionId: transaction_id
    }

    order.findOneAndUpdate(
        { user_id: req.user.user.id, "orders._id" : _id }, 
        {
            $set: {
                "orders.$.orderStatus":Status,
                "orders.$.transactionId":transaction_id,
            },
          },
          { new: true },
    ).then((response)=>{
        if(!response){
            res.send('Order update Failed')
        }else{
            if(Status == "success"){
                // clear cart
            }

            return res.json({response})
        }
    })
    .catch((err)=>{
        res.json({err})
    })
})

//@desc get order
//@route GET /hserver/order/
//@access private
const getOrders = asynchandler((req,res)=>{
    order.findOne({user_id: req.user.user.id})
    .populate({
        path:"orders",
        populate: {
            path:"products",
            populate:{
                path:"product",
                model: "Medicine",
                select: "Name Manufacturer_name Type Pack_size_label Price Short_composition Is_discontinued",
            }

            
        }   
    })
    .then((response)=>{
        return res.json({response})
    })
    .catch((err)=>{
        return res.json((err))
    })
})
 
module.exports = {createOrder,updateOrder,getOrders,initializeOrder}
