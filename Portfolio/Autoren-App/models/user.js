const mongoose = require("mongoose");
const moment= require("moment");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: moment().format("MMMM Do YYYY, h:mm a")
    },
    newMessanges: {
        type: [String],
        default: []
    },
    Rang: {
        type: String,
        default: "User"
    },
    friends: {
        type: [String],
        default: []
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;