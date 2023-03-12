const user = require("../models/userModel")
const cards = require("../models/cardsModel")
const order = require("../models/orderModel")

const stripeController = require("../controller/stripeController")
const cart = require("../models/cartModel")

const asynchandler = require("express-async-handler")

//@desc create order
//@route POST /hserver/order/
//@access private

// const createOrder = asynchandler(async(req,res)=>{
//     const {
//         card_Name,
//         card_Number,
//         card_ExpMonth,
//         card_ExpYear,
//         card_CVC,
//         amount
//                         } = req.body
//     user.findOne({_id:req.user.user.id}, async(err,userDB)=>{
//         if(err){
//             return res.json(err);
//         }else{
//             var model = {};

//             if(!userDB.stripeCustomerID){
//                 await stripeController.createCustomer({
//                     "name": userDB.name,
//                     "email":userDB.email
//                 },(error,results)=>{
//                     if(error){
//                         return res.json(error);
//                     }

//                     if(results){
//                         userDB.stripeCustomerID = results.id;
//                         userDB.save()

//                         model.stripeCustomerID = results.id
//                     }
//                 })
//             }else{
//                 model.stripeCustomerID = userDB.stripeCustomerID;
//             }

//             cards.findOne({
//                 customerId: model.stripeCustomerID,
//                 card_Number,
//                 card_ExpMonth,
//                 card_ExpYear
//             },async(err, cardDB)=>{
//                 if(err){
//                     return res.json(err);
//                 }else{
//                     if(!cardDB){
//                         await stripeController.addCard({
//                             card_Name,
//                             card_Number,
//                             card_ExpMonth,
//                             card_ExpYear,
//                             card_CVC
//                         },(err,results)=>{
//                             if(err){
//                                 res.send(err)
//                             }

//                             if(results){
//                                 const cardModel = new cards({
//                                     cardId : results.id,
//                                     cardName: card_Name,
//                                     cardNumber : card_Number,
//                                     cardExpMonth: card_ExpMonth,
//                                     cardExpYear : card_ExpYear,
//                                     customerId: model.stripeCustomerID
//                                 });

//                                 cardModel.save()
//                                 model.cardId = results.card;


//                               }
//                         })
//                     }else{
//                         model.cardId = cardDB.cardId;
//                     }

//                     await stripeController.generatePaymentIntent({
//                         "receipt_email":userDB.email,
//                         "amount": amount,
//                         "card_id":model.cardId,
//                         "customer_id": model.stripeCustomerID
//                     },(err, results)=>{
//                         if(err){
//                             res.json(err)
//                         }

//                         if(results){
//                             model.paymentIntentId = results.id;
//                             model.client_secret = results.client_secret;
//                         }
//                     });

//                     cartcontroller.getCart({user_id: userDB.id}, (err, cartDB)=>{
//                         if(err){
//                             return res.json(err); 
//                         }else{
//                             if(cartDB){
//                                 var products = [];
//                                 var garndTotal = 0;

//                                 cartDB.products.forEach(product =>{
//                                     products.push({
//                                         product: product.product._id,
//                                         qty: product.qty,
//                                         amount: product.product.productSalePrice
//                                     });

//                                     garndTotal += product.product.productSalePrice;
//                                 });

//                                 const orderModel = new order({
//                                     userId: cartDB.user_id,
//                                     products: products,
//                                     orderStatus:"pending",
//                                     garndTotal:garndTotal
//                                 });


//                                 orderModel
//                                 .save()
//                                 .then((response)=>{
//                                     model.orderId = response._id;
//                                     return res.json({model})
//                                 })
//                                 .catch((error)=>{
//                                     return res.json({error})
//                                 })
//                             }
//                         }  
//                     })
//                 }
//             })
//         }
//     })


// })


const createOrder = asynchandler(async(req,res)=>{
    const {shippingDetails} = req.body
    user.findOne({_id:req.user.user.id},async(err,userDB)=>{
        if(err){
            throw new Error(err)
        }else{   
            var products = [];
            var grandTotal = 0;

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
        //res.json({cartDB})
        cartDB.products.forEach(product=>{
            products.push({
            product: product.product._id,
            qty: product.qty,
            amount: product.product.Price * product.qty
        }) ;
        
        grandTotal += (product.product.Price * product.qty)
        });

        const orderModel = new order({
            user_id: cartDB.user_id,
            products: products,
            orderStatus:"pending",
            grandTotal: grandTotal,
            shippingDetails:shippingDetails
        });

        orderModel
        .save()
        .then((response)=>{
            res.json({response})
        })
        
    })
        .catch((err)=>{
        throw new Error(err)
        })
            

        }
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

    order.findByIdAndUpdate(
        _id, model, {useFindAndModify: false}
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
        path:"products",
        populate: {
            path:"product",
            model: "Medicine",
            select: "Name Manufacturer_name Type Pack_size_label Price Short_composition Is_discontinued",
        }   
    })
    .then((response)=>{
        return res.json({response})
    })
    .catch((err)=>{
        return res.json((err))
    })
})
 
module.exports = {createOrder,updateOrder,getOrders}
