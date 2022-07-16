const Like = require('../models/like');

const LikesController ={
  Add: (req, res) => {
    console.log("like req.body")
    console.log(req.body)
    const likeObj = {post_id: req.body.post_id, likers: req.session.user.email};
    const like = new Like(likeObj);
    like.save();
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    // currently would generate a new like entry and add to existing like entry. need to fix.
    // consider create a new like entry for every new post
    Like.findOneAndUpdate(
      { post_id: like.post_id },
      { $push: {likers: like.likers }},
      function (err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      }
    )
    res.redirect('/posts');
  },
};

module.exports = LikesController;