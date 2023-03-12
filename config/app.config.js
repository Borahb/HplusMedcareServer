const mongoose = require("mongoose")
require("dotenv").config()


const dbconnect = async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected :" , connect.connection.host, connect.connection.name)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}


const STRIPE_CONFIG = {
    STRIPE_KEY: "sk_test_51Mk7c1SEcS8URct2E6HPPCvCuQudtHfpkjObC9lyTBggyLGt18nciKEhSoxIaAc2BnvHRoAUXbTX969xQITLuLgw00cPTbCIX2",
    CURRENCY:"inr"
}

module.exports = {dbconnect,STRIPE_CONFIG}