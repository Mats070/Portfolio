const express = require("express");
const router = express.Router();
const renewToken = require("../tools/renewAccessToken");
const LogoutController = require("../tools/handleLogout");

const User = require("../models/user");

router.get("/", (req, res)=>{
    const token = renewToken(req)
    res.render("dashboard", {
        token: token
    })
})

router.get("/logout", LogoutController)

module.exports = router;