const express = require("express")
const dbconnect = require("./config/dbConnection")
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
app.use("/hserver/users", require("./routes/userRoutes"))
app.use("/hserver/cart", require("./routes/cartRoutes"))

//middleware
app.use(errorHandler)


//server listenning
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})