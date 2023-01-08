const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
    users: {
        type: [String],
        default: []
    },
    Name: {
        type: String
    }
})

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
module.exports = ChatRoom;