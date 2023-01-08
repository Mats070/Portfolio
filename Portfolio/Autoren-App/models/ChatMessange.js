const mongoose = require("mongoose");
var Time = new Date;


const ChatmessageSchema = new mongoose.Schema({
    toRoom: {
        type: String,
        required: true
    },
    authorM: {
        type: String,
        required: true
    },
    MessageContent: {
        type: String,
        required: true
    },
    MauthorID: {
        type: String,
    },
    date: {
        type: String,
        default: Time.toLocaleTimeString()
    },
    likers: {
        type: [String],
        default: []
    }
})

const Chatmessage = mongoose.model("ChatMessage", ChatmessageSchema);
module.exports = Chatmessage;