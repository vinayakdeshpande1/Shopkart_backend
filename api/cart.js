const express = require("express")
const bcrypt = require("bcryptjs")
// const user = require("../models/user")
const jwt = require("jsonwebtoken")
const env = require("dotenv/config")
const userModel = require("../models/user")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { token } = req.body

        const user = jwt.verify(token, JWTSECRET)
        // console.log(user)
        userModel.find({ _id: user.id }).lean().exec((err, data) => {
            console.log(data[0].cart)
            return res.json({
                status: "success",
                cart: data[0].cart
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

module.exports = router