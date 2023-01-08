// Load User Model
const User = require("../models/user");

const logout = (req, res)=>{
    if (req.user){
        const username = req.user.GeneralData.get("name");
        User.findOne({"GeneralData.name": username})
        .then(user=>{
            if(user){
                user.SecretData.set("refreshToken", "");
                user.save();
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                res.redirect("/");
            }else{
                res.sendStatus("500")
            }
        })
    }
}

module.exports = logout