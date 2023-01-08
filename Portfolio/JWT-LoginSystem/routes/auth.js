const express = require("express");
const router = express.Router();


//Tools 
const registerTools = require("../tools/registerTool");
const loginTools = require("../tools/handleLoginTool")


router.get("/", (req, res)=>{
    res.send("Start Authenticating...")
})

router.get("/login", (req, res)=>{
    res.render("login", {
        errors: []
    })
});

router.get("/register", (req, res)=>{
    res.render("register", {
        errors: []
    })
})

router.post("/register", registerTools.newUser);

router.post("/login", loginTools.handleLogin)


module.exports = router;