const Like = require('../models/like');

const LikesController ={
  Add: (req, res) => {
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    // Finding the like entry using post_id, add the liker to the likers array in the entry
    // $addToSet does not allow duplicate
    Like.findOneAndUpdate(
      { post_id: req.body.post_id },
      { $addToSet: {likers: req.session.user.email }},
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