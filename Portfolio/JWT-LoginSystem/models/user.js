const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    GeneralData: {
        type: Map,
        of: String,
    },
    SecretData: {
        type: Map,
        of: String,
    },
    ArrayData: {
        type: Map,
        of: Array
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;