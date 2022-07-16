const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse();
      console.log(posts[0]); //visualisation only
      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {session: req.session});
  },
  Create: (req, res) => {
    console.log(req.session) // for visualisation only
    let postObj = req.body;
    postObj.poster = req.session.user.email;
    console.log(postObj); // for visualisation only
    const post = new Post(postObj);

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;