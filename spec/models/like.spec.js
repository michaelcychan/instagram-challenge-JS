const mongoose = require('mongoose');

require('../mongodb_helper');
const Like = require("../../models/like");

describe("Like model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.likes.drop(() => {
      done();
    });
  });

  it("initialises with a post_id and an empty list of likers", () => {
    const likeInitObj = {post_id: 'random_id'};
    const like = new Like(likeInitObj);
    expect(like.post_id).toStrictEqual('random_id');
    expect(like.likers.toObject()).toEqual([]);
  });

  it('can find all likes', (done) => {
    Like.find((err, likes) => {
      expect(err).toBeNull();
      expect(likes).toEqual([]);
      done();
    });
  });

  it('creates a like entry', (done) => {
    const likeObj = { post_id: "random_post_id" };
    const like = new Like(likeObj);
    like.save((err) => {
      expect(err).toBeNull();
      Like.find((err, likes) => {
        expect(err).toBeNull();
        expect(likes[0].toObject()).toMatchObject({ post_id: "random_post_id", likers: [] });
        done();
      });
    });
  });

  it('adds a liker', (done) => {
    const likeObj = { post_id: "another_random_post_id" };
    const like = new Like(likeObj); 
    like.save((err) => {
      expect(err).toBeNull();
      Like.findOneAndUpdate(
        { post_id: "another_random_post_id" },
        { $addToSet: {likers: 'i-clicked-like@post.com' }},
        function (err, doc) {
          expect(err).toBeNull();
          Like.find((err, likes) => {
            expect(err).toBeNull();
            expect(likes[0].toObject()).toMatchObject({ post_id: "another_random_post_id", likers: ['i-clicked-like@post.com'] });
            done();
          })
        }
      )
    })
  })

  it('prevents adding the same liker', (done) => {
    const likeObj = { post_id: "another_random_post_id" };
    const like = new Like(likeObj); 
    like.save((err) => {
      expect(err).toBeNull();
      Like.findOneAndUpdate(
        { post_id: "another_random_post_id" },
        { $addToSet: {likers: 'i-clicked-like@post.com' }},
        function (err, doc) {
          expect(err).toBeNull();
          Like.findOneAndUpdate(
            { post_id: "another_random_post_id" },
            { $addToSet: {likers: 'i-clicked-like@post.com' }},
            function (err, doc) {
              expect(err).toBeNull();
              Like.find((err, likes) => {
                expect(err).toBeNull();
                expect(likes[0].toObject()).toMatchObject({ post_id: "another_random_post_id", likers: ['i-clicked-like@post.com'] });
                done();
              })
            }
          )
        }
      )
    })
  })
});
