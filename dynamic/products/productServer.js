const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const env = require("dotenv/config")
const cors = require("cors")
const productModel = require("../../models/product")

const app = express()

// GLOBAL
const PORT = process.env.PORT || 3330
const DBURL = "mongodb://localhost:27017/shopkart-db"


// Connect to DB
mongoose.connect(DBURL, () => {
    console.log("Connected to DB");
})

// Middlewares
app.use(cors())
app.use(bodyParser.json())


app.get("/", async (req, res) => {
    res.sendFile("addProduct.html", { root: "C:/Users/SAI/Desktop/shopkart-backend/dynamic/products" })
})

app.post("/", (req, res) => {
    const { name, description, img,  category, price, originalPrice, quantityAvailable, quantitySold } = req.body
    console.log({ name, description, img,  category, price, originalPrice, quantityAvailable, quantitySold })
    try {
        productModel.insertMany({ name, category, img, price, originalPrice, quantityAvailable, quantitySold })
            // .then((response) => response.json())
            .then((data) => {
                console.log(data)
                return res.json({
                    status: "success",
                    data
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


// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})
