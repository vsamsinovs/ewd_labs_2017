import mongoose from 'mongoose';
import assert from 'assert';
import CommentModel from './api/comments/comment.model';
import config from './config';

const comments = [
  {
    postId: '590a2adb6ef7527bd0ab1c29',
    author: 'asd',
    content: "Not so good!",
    upvotes: 5
  },
  {
    postId: '590a2adb6ef7527bd0ab1c29',
    author: 'Vadims Samsinovs',
    content: "Great Post keep it up!",
    upvotes: 10
  }
];

export const loadComments = () => {
  CommentModel.find({}).remove(function () {
    CommentModel.collection.insert(comments, (err, docs) => {
      if (err) {
        console.log(`failed to Load Comment Data`);
      }
      else {
        console.info(`${comments.length} comments were successfully stored.`);
      }
    })
  });
}