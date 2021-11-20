const express = require("express")
const bcrypt = require("bcryptjs")
// const user = require("../models/user")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const userModel = require("../models/user")
const productModel = require("../models/product")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { token } = req.body

        const user = jwt.verify(token, JWTSECRET)
        // console.log(user)
        userModel.find({ _id: user.id }).lean().exec((err, data) => {

            try {
                product = []
                data[0].cart.map((item) => {
                    // console.log(item)
                    productModel.find({ _id: item.productId }).lean().exec((err, productInfo) => {
                        // console.log(productInfo)
                    })
                })

                // console.log(product)

                return res.json({
                    status: "success",
                    cart: data[0].cart
                })
            } catch (err) {
                return res.json({
                    status: "error",
                    error: err,
                    cart: []
                })
            }
        })
    } catch (err) {
        // console.log(err)
        return res.json({
            status: "error",
            error: err,
            cart: []
        })
    }
})

router.post("/add/:productID", async (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.json({
            status: "error",
            error: "Token not provided"
        })
    }

    let user = {}
    try {
        user = jwt.verify(token, JWTSECRET)
    } catch (err) {
        return res.json({
            status: "error",
            error: err
        })
    }

    userModel.find({ _id: user.id }).lean().exec((err, data) => {

        hasDuplicateCartItem = false
        for (let item of data[0].cart) {
            if (item.productId === req.params.productID) {
                hasDuplicateCartItem = true
                break
            }
        }

        if (!hasDuplicateCartItem) {
            userModel.updateOne({ _id: user.id }, { $push: { "cart": { "productId": req.params.productID, "quantity": 1 } } }).lean().exec((err, data) => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: err
                    })
                }

                res.json({
                    status: "success",
                    data,
                })
            })
        } else {
            res.json({
                status: "duplicate",
                msg: "Product already exist in Cart",
            })
        }
    })
})

router.post("/remove/:productID", async (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.json({
            status: "error",
            error: "Token not provided"
        })
    }

    let user = {}
    try {
        user = jwt.verify(token, JWTSECRET)
    } catch (err) {
        return res.json({
            status: "error",
            error: err
        })
    }

    userModel.find({ _id: user.id }).lean().exec((err, data) => {

        itemExists = false
        for (let item of data[0].cart) {
            if (item.productId === req.params.productID) {
                itemExists = true
                break
            }
        }

        if (itemExists) {
            userModel.updateOne({ _id: user.id }, { $pull: { "cart": { "productId": req.params.productID } } }).lean().exec((err, data) => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: err
                    })
                }

                res.json({
                    status: "success",
                    data,
                })
            })
        } else {
            res.json({
                status: "no-product-in-cart",
                msg: "Product does not exist in Cart",
            })
        }
    })
})

router.post("/increase/:increaseBy/:productID", async (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.json({
            status: "error",
            error: "Token not provided"
        })
    }

    let user = {}
    try {
        user = jwt.verify(token, JWTSECRET)
    } catch (err) {
        return res.json({
            status: "error",
            error: err
        })
    }

    userModel.find({ _id: user.id }).lean().exec((err, data) => {

        itemExists = false
        // console.log(data[0].cart)
        for (let item of data[0].cart) {
            if (item.productId === req.params.productID) {
                itemExists = true
                // console.log("found")
                break
            }
            // console.log("aloy itha")
        }

        if (itemExists) {
            userModel.updateOne({ _id: user.id, "cart.productId": req.params.productID }, { $inc: { "cart.$.quantity": req.params.increaseBy } }).lean().exec((err, data) => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: err
                    })
                }

                // console.log("set")
                return res.json({
                    status: "success",
                    data,
                })
            })
        } else {
            res.json({
                status: "no-product-in-cart",
                msg: "Product does not exist in Cart",
            })
        }
    })
})

router.post("/place-order", async (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.json({
            status: "error",
            error: "Token not provided"
        })
    }

    let user = {}
    try {
        user = jwt.verify(token, JWTSECRET)
    } catch (err) {
        return res.json({
            status: "error",
            error: err
        })
    }

    userModel.find({ _id: user.id }).lean().exec((err, data) => {
        try {
            let temp = []
            userModel.updateOne({ _id: user.id }, { $set: { orders: data[0].cart }, $set: { cart: temp } }).lean().exec((err, result) => {
                // console.log(result)
                res.json({
                    result
                })
            })
        } catch (error) {
            res.json({
                error
            })
        }
    })
})

router.post("/my-orders", async (req, res) => {
    try {
        const { token } = req.body

        const user = jwt.verify(token, JWTSECRET)
        // console.log(user)
        userModel.find({ _id: user.id }).lean().exec((err, data) => {

            product = []
            data[0].cart.map((item) => {
                productModel.find({ _id: item.productId }).lean().exec((err, productInfo) => {
                })
            })

            return res.json({
                status: "success",
                cart: data[0].orders
            })
        })
    } catch (err) {
        // console.log(err)
        return res.json({
            status: "error",
            error: err
        })
    }
})


// db.users.update({_id: ObjectId("61923e3f0fdbf61ec4b27acc"), "cart.productID": ObjectId("61923e3f0fdbf61ec4b27acc")}, { $inc: { "cart.$.quantity": 1}})

// Update Cart
// db.users.update({_id: ObjectId("61923e3f0fdbf61ec4b27acc")}, {$push: { "cart" : { "productID": ObjectId("61923e3f0fdbf61ec4b27acc"),  "quantity": 6}}})

module.exports = router