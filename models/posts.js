const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
    author: String,
    creatorID : String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;