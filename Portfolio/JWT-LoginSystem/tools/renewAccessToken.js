const jwt = require('jsonwebtoken');
require('dotenv').config();

const renewAccessToken = (req) =>{
    if (req.user){
        const username = req.user.GeneralData.get("name");
        const token = jwt.sign(
            {username: username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        )
        return token;
    }
}

module.exports = renewAccessToken;