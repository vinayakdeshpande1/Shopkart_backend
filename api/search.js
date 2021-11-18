const express = require("express")
const bcrypt = require("bcryptjs")
const user = require("../models/user")
const jwt = require("jsonwebtoken")
const env = require("dotenv/config")
const productModel = require("../models/product")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.get("/:term", async (req, res) => {
    try {
        const regex = RegExp(req.params.term, "i")
        productModel.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] }).then((result) => {
            return res.json({
                status: "success",
                result,
                length: result.length
            })
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: "error",
            error
        })
    }
})

module.exports = router