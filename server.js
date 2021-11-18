const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const env = require("dotenv/config")
const cors = require("cors")

const app = express()

// GLOBAL
const PORT = process.env.PORT || 3300
const DBURL = process.env.DBURL


// importing routes
const loginRoute = require("./api/login")
const registerRoute = require("./api/register")
const cartRoute = require("./api/cart")
const productRoute = require("./api/product")
const searchRoute = require("./api/search")

// Connect to DB
mongoose.connect(DBURL, () => {
    console.log("Connected to DB");
})

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/cart", cartRoute)
app.use("/products", productRoute)
app.use("/search", searchRoute)


// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})
