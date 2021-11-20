const express = require("express")
const bcrypt = require("bcryptjs")
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const env = require("dotenv/config")
const userModel = require("../models/user")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.json({
                status: "error",
                error: "Token not provided",
                result: []
            })
        }

        let user = {}
        try {
            user = jwt.verify(token, JWTSECRET)
            userModel.find({_id: user.id}).lean().exec((err, result) => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: err,
                        result: []
                    })
                } else {
                    console.log(result)
                    return res.json({
                        status: "success",
                        result: {
                            fullname: result[0].fullname,
                            email: result[0].email,
                            phone: result[0].phone,
                            gender: result[0].gender,
                        }
                    })
                }
            })
        } catch (err) {
            return res.json({
                status: "error",
                error: err,
                result: []
            })
        }
    } catch (error) {
        returnres.json({
            status: "error",
            error: err,
            result: []
        })
    }
})

router.post("/update", async (req, res) => {
    try {
        const { token, fullname, gender, email, phone } = req.body
        console.log({ token, fullname, gender, email, phone })

        if (!token) {
            return res.json({
                status: "error",
                error: "Token not provided",
                result: []
            })
        }

        let user = {}
        try {
            user = jwt.verify(token, JWTSECRET)
            userModel.updateOne({_id: user.id}, {$set: {fullname, email, gender, phone}}).lean().exec((err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({
                        status: "error",
                        error: err,
                        result: []
                    })
                } else {
                    return res.json({
                        status: "success",
                        result,
                    })
                }
            })
        } catch (err) {
            return res.json({
                status: "error",
                error: err,
                result: []
            })
        }
    } catch (error) {
        returnres.json({
            status: "error",
            error: err,
            result: []
        })
    }
})

module.exports = router