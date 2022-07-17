const mongoose = require('mongoose');

require('../mongodb_helper');
const Like = require("../../models/like");

describe("Like model", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.like.drop(() => {
  //     done();
  //   });
  // });

  it("initialises with a post_id and an empty list of likers", () => {
    const likeInitObj = {post_id: 'random_id'};
    const like = new Like(likeInitObj);
    expect(like.post_id).toStrictEqual('random_id');
    expect(like.likers.toObject()).toEqual([]);
  });
})