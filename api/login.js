const express = require("express")
const bcrypt = require("bcryptjs")
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const env = require("dotenv/config")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.post("/", async (req, res) => { 
    const { email, password } = req.body
    const account = await user.findOne({ email }).lean()

    if (!account) {
        return res.json({
            status: "Error",
            msg: "User does not exist",
            code: "404"
        })
    }

    if (await bcrypt.compare(password, account.password)) {

        const token = jwt.sign({
            id: user._id,
            fullname: user.fullname,
        }, JWTSECRET)

        // console.log(token)

        return res.json({
            status: "Ok",
            msg: "User validated",
            code: "200",
            token,
            fullname: account.fullname,
        })
    } else {
        return res.json({
            status: "Error",
            msg: "Wrong Password",
            code: "201"
        })
    }
})

module.exports = router