const { Int32 } = require("mongodb")
const mongoose = require("mongoose")

const medSchema = mongoose.Schema({
    Name:{
        type: String,
        required: [true,"Please add medicine name"]
    },
    Manufacturer_name:{
        type: String,
        required: [true,"Please add manufacturer name"]
    },
    Type:{
        type: String,
        required: [true,"Please add type"]
    },

    Pack_size_label:{
        type: String,
        required: [true,"Please add pack size label"]
    },
    Price:{
        type: Number,
        required: [true,"Please add price"]
    },
    Short_composition:{
        type: String,
        required: [true,"Please short composition"]
    },
    Is_discontinued:{
        type: String,
        required: [true,"Please add True / False"]
    }

})

module.exports = mongoose.model("Medicine", medSchema)