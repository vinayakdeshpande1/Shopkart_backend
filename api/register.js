const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

const router = express.Router()

router.post("/", async (req, res) => {
    const { fullname, email, phone, password } = req.body
    passwordEncrypted = await bcrypt.hash(password, 10)
    //console.log(passwordEncrypted);
    try {
        User.insertMany({
            fullname,
            email,
            phone,
            password: passwordEncrypted,
        })

        res.json({ status: "ok", code: "200" })
    } catch (error) {
        res.json({ status: "Error", code: "400" })
    }
})

module.exports = router