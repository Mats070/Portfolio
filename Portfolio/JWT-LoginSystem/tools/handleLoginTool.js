require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ReqLocation = require("./detectSource");
const getIP = require("./getIPAdress"); 

// Load User Model
const User = require("../models/user");

const handleLogin = async (req, res)=>{
    let errors = [];

    const {name, password} = req.body;
    if (!name || !password){
        errors.push("Fill out all Fields");
        return res.render("login", {
            errors: errors
        })
    }
    //Find User by Username
    User.findOne({ "GeneralData.name": name })
    .then(user =>{
        if (!user){
            //Username ist nicht registriert
            errors.push("This Username is not registered");
            res.render("login", {
                errors: errors
            })
        }else{
            //User gefunden 
            const storedPassword = user.SecretData.get("password");
            const match = bcrypt.compareSync(password, storedPassword)
            if (!match){
                //Passwort falsch
                errors.push("Password incorrect");
                res.render("login", {
                    errors: errors
                })
            }else{
                //Passwort richtig => Create JWT
                const accessToken = jwt.sign(
                    {
                        username: name

                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    //Change That later
                    { expiresIn: '1m' }
                );

                const refreshToken = jwt.sign(
                    {
                        username: name

                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    //Change That later
                    { expiresIn: '3d' }
                );
                user.SecretData.set("refreshToken", refreshToken);

                //IP-Adress 
                const IP_Adress = getIP(req);
                let IPs = user.ArrayData.get("IP_Addresses")
                if (!IPs.includes(IP_Adress)){
                    IPs.push(IP_Adress);
                    user.ArrayData.set("IP_Addresses", IPs)
                }
                //User saven
                user.save();
                const loc = ReqLocation(req);

                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
                if(loc == "/auth/login"){
                    res.redirect("/users")
                }else{
                    res.redirect(loc)
                }
            }

        }
    })
}

module.exports = {handleLogin}