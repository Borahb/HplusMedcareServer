const {STRIPE_CONFIG} = require("../config/app.config");
const stripe = require("stripe")
const asynchandler = require("express-async-handler")


const createCustomer = asynchandler(async(req,res)=>{
    const {name,email} = req.body;
    const customer = await stripe.customers.create({
        name,
        email
    })

    res.status(200).json({customer});
})




const addCard = asynchandler(async(req,res)=>{
    const {customer_Id,card_Name, card_Number,card_ExpMonth,card_ExpYear,card_CVC} = req.body;
    const card_token = await stripe.tokens.create({
        card: {
        card_Name, 
        card_Number,
        card_ExpMonth,
        card_ExpYear,
        card_CVC
    }})
    const card = await stripe.customers.createSource(customer_Id,{
        source: `${card_token.id}`
    })


    res.json({card: card.id})
})


const generatePaymentIntent = asynchandler(async(req,res)=>{

    const {receipt_email,amount,customer_id,card_id} = req.body;

    const createPaymentIntent = await stripe.paymentIntents.create({
        receipt_email,
        amount,
        currency: STRIPE_CONFIG.CURRENCY,
        payment_method : card_id,
        customer_id,
        payment_method_types : ['card'],
    })

    res.json({createPaymentIntent});

})


module.exports = {createCustomer,addCard,generatePaymentIntent}
