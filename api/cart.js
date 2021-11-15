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
    const { token } = req.body
    // console.log("token: ", token)

    const user = jwt.verify(token, JWTSECRET)
    // console.log(user)
    userModel.find({_id: user.id}).lean().exec((err, data) => {
        console.log(data[0])
    })

    res.json({
        status: "ok",
        user,
    })
})

module.exports = router