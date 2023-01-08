const bcrypt = require("bcrypt");
const User = require("../models/user");

const getIP = require("./getIPAdress");

const newUser = (req, res)=>{
    const {email, name, password} = req.body;

    let errors = [];

    if(!email || !name || !password){
        errors.push("Please fill in all fields");
    }

    //Check password length
    if(password.length < 6){
        errors.push("Password should not be week");
    }

    if(errors.length > 0){
        res.render("register", {
            errors,
            name,
            password
        });
    }else{
        //First validation passed
        User.findOne({ "GeneralData.name": name })
        .then(user =>{
            if(user){
               // User exist 
               errors.push("Username is already registered")
               res.render("register", {
                errors,
                email,
                name,
                password
               })
            } else {
                    if(name.includes("<") || name.includes(">") || name.includes("|") || name.includes(",") || name.includes("$") || name.includes("&") || name.includes("%") || name.includes("*") || name.includes("+") || name.includes("/") || name.includes("{") || name.includes("[") || name.includes("}") || name.includes("]") || name.includes("(") || name.includes(")") || name.includes('"') || name.includes("'")){
                        //Keine Sonderzeichen (Meldung ins Frontend geben)
                        errors.push("You used an special character which is not allowed");
                        res.render("register", {
                            errors,
                            email,
                            name,
                            password,
                        })
                    }else{
                        //Neuen User erstellen
                        const newUser = new User({
                            GeneralData: {
                                name: name,
                                email: email,
                            },
                            SecretData: {
                                password: password,
                            },
                            ArrayData:{
                                IP_Addresses: [getIP(req)]
                            },
                    })
                   
                // Hash Passwort
                console.log(newUser)   
                bcrypt.genSalt(10, (err, salt)  => 
                bcrypt.hash(newUser.SecretData.get("password"), salt, (err, hash) =>{
                    if(err) throw err;
                    //set password to hashed
                    newUser.SecretData.set("password", hash);
                    //Save User in Database
                    newUser.save()
                    .then(user =>{
                        res.redirect("/auth/login");
                    })
                    .catch(err => console.log(err));
                }))        
                }
            }
        });
    }
}

module.exports = { newUser }