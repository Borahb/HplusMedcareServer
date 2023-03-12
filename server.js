const express = require("express")
const {dbconnect} = require("./config/app.config")
const mongoose = require("mongoose")
const errorHandler = require("./middleware/errorHandler")
const app = express()
require("dotenv").config()
mongoose.set('strictQuery', false)

//port
const port = process.env.PORT || 3000

//dbconnection
dbconnect();

//bodyparser
app.use(express.json())

//routes
app.use("/hserver/medicine", require("./routes/medicineRoutes"))
app.use("/hserver/auth", require("./routes/userRoutes"))
app.use("/hserver/cart", require("./routes/cartRoutes"))
app.use("/hserver/user", require("./routes/addressRoutes"))
app.use("/hserver/order", require("./routes/orderRoutes"))
app.all("*",(req,res)=>{res.status(404).json({"mess":"Invalid Route"})});
//middleware
app.use(errorHandler)


//server listenning
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})