const Like = require("../models/like");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse();
      // console.log(posts[0]); //visualisation only
      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {session: req.session});
  },
  
  Create: (req, res) => {
    let postObj = req.body;
    postObj.poster = req.session.user.email;
    // console.log(postObj); // for visualisation only
    const post = new Post(postObj);
    // console.log(post);

    post.save((err) => {
      if (err) {
        throw err;
      }

      //creating a like entry
      const likeInitObj = { post_id: post._id };
      const like = new Like(likeInitObj);
      like.save();

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;