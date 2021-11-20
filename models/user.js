const mongoose = require("mongoose")

const cart = new mongoose.Schema({
    productId: String,
    quantity: Number,
})

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    cart: [cart],
    orders: [cart]
}, { collection: "users" })

module.exports = mongoose.model("UserSchema", UserSchema)
