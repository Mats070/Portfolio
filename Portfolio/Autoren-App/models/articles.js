const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema ({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishmentDate: {
        type: Date,
        default: Date.now
    }, 
    authorID: {
        type: String,
        required: true
    }, 
    Status: {
        type: String,
        default: "private"
    },
    likers: {
        type: [String]
    }, 
    genre: {
        type: String,
        required: false
    },
    reported: {
        type: String,
        default: "false"
    }
})

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;