const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    Cauthor: {
        type: String,
        required: true
    },
    toArticle: {
        type: String,
        required: true
    },
    CommentContent: {
        type: String,
        required: true
    },
    CauthorID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    likers: {
        type: [String],
        default: []
    },
    reported: {
        type: String,
        default: "false"
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;