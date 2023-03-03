const asynchandler = require("express-async-handler")
const async = require("async")
const Cart = require("../models/cartModel")


//@desc add to cart
//@api POST hserver/medicine/cart
//acess private

const addtoCart = asynchandler(async(req,res)=>{
    const {products} = req.body


    if (!req.user.user.id){
        res.status(400)
        throw new Error("UserId Required")
    }

    Cart.findOne({user_id:req.user.user.id},(err, cart)=>{
        if(err){
            throw new Error(err)
        }else{
            if(cart == null){
                const cartmodel = new Cart({
                    user_id:req.user.user.id,
                    products:products,
                });

                cartmodel
                .save()
                .then((response)=>{
                    res.json({response})
                })
                .catch((err)=>{
                    throw new Error(err)
                })
            }else if (cart.products.length == 0){
                cart.products = products;
                cart.save()
                res.json({cart})
            }else{
                async.eachSeries(products,(product, asyncDone)=>{
                    let itemIndex = cart.products.findIndex(p=>p.product == product.product);

                    if(itemIndex === -1){
                        cart.products.push({
                            product: product.product,
                            qty: product.qty
                        });

                        cart.save(asyncDone)
                    }else{
                        cart.products[itemIndex].qty = product.qty;
                        cart.save(asyncDone)
                    }
                });

                res.json({cart})
            }
        }
    })
    
})

//@desc get cart
//@api POST hserver/medicine/cart
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
    // console.log(productId)
    // console.log(qty)
    // Cart.findOne({user_id: req.user.user.id}, (err, cart)=>{
    //     if(err){
    //         throw new Error(err)
    //     }else{
    //         if(productId && qty){
    //             if(cart.products.length === 0){
    //                 res.json({"mess":"Cart Empty"})
    //             }
    //         }else{
    //             let itemIndex = cart.products.findIndex(p=>p.product == productId);

    //             if(itemIndex === -1){
    //                 res.json({"mess":"Invalid Product"});
    //             }
    //             else{
    //                 if(cart.products[itemIndex].qty === qty){
    //                     cart.products.splice(itemIndex,1);
    //                 }
    //                 else if(cart.products[itemIndex].qty > qty){
    //                     cart.products[itemIndex].qty = cart.products.qty - qty;
    //                 }else{
    //                     res.json({"mess":"Enter lower Qty"})
    //                 }

    //                 cart.save((err, res)=>{
    //                     if(err) throw new Error(err)
    //                     res.json({"mess":"Cart Updated"})
    //                 })
    //             }
    //         }
    //     }
    // })
    console.log(productId)
    if(productId){
        Cart.updateOne(
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




module.exports =  {addtoCart,getCart,removeCartItem};