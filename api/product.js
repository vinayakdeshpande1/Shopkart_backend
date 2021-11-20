const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const env = require("dotenv/config")
const productModel = require("../models/product")

// GLOBAL
const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.get("/all", async (req, res) => { 
    productModel.find({}).lean().exec((err, data) => {

        if (err) {
            return res.json({
                status: 400,
                error: err
            })
        }

        // console.log("All products fetched by: ", req.headers.host)
        return res.json({
            data,
            length: data.length,
        })
    })
})

router.get("/category/:category", async (req, res) => { 
    productModel.find({category: req.params.category}).lean().exec((err, data) => {
        if (err) {
            return res.json({
                status: 400,
                error: err
            })
        }

        // console.log(`Category: "${req.params.category}" fetched by ${req.headers.host}`)
        return res.json({
            data,
            length: data.length,
        })
    })
})

router.get("/:productID", async (req, res) => { 
    productModel.find({_id: req.params.productID}).lean().exec((err, data) => {
        if (err) {
            return res.json({
                status: 400,
                error: err
            })
        }

        // console.log(`ProductID: "${req.params.productID}" fetched by ${req.headers.host}`)
        return res.json({
            data: data[0],
            length: data.length,
        })
    })
})

module.exports = router