const mongoose = require("mongoose");

// names of schema key matches the "name" attribue of the input tag in html
const PostSchema = new mongoose.Schema({
  imageUrl: String,
  message: String,
  poster: String,
}, {
  timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;