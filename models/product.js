const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    quantityAvailable: {
        type: Number,
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
}, { collection: "products" })

module.exports = mongoose.model("ProductSchema", ProductSchema)
