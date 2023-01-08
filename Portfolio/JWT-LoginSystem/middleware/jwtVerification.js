require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next)=>{
    const user = req.user;
    const token = req.cookies.jwt;
    if (token){
        if (user){
            //Everything fine
            next();
        }else{
            return res.render("login", {errors: ["Please log in again"]});
        }
    }else{
        return res.redirect("/auth/login");
    }
}

module.exports = verifyJWT;