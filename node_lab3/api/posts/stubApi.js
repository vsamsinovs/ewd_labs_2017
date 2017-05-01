import _ from 'lodash';
import posts from './posts';

const stubAPI = {
  getAll: () => {
    return posts;
  },
  add: (t, l) => {
    let id = 1;
    const last = _.last(posts);
    if (last) {
      id = last.id + 1;
    }
    let len = posts.length;
    let newL_len = posts.push({
      'id': id,
      title: t, link: l, username: '', comments: [], upvotes: 0
    });
    return newL_len > len ? id : -1;
  },
  upvote: (id) => {
    const index = _.findIndex(posts,
      function (post) {
        return post.id == id;
      });
    if (index !== -1) {
      posts[index].upvotes += 1;
      return true;
    }
    return false;
  },
  getPost: (id) => {
    let result = null;
    const index = _.findIndex(posts,
      function (post) {
        return post.id == id;
      });
    if (index !== -1) {
      result = posts[index];
    }
    return result;
  },
  addComment: (postId, c, n) => {
    let result = false;
    const post = stubAPI.getPost(postId);
    let id = 1;
    if (post) {
      const last = _.last(post.comments);
      if (last) {
        id = last.id + 1;
      }
      post.comments.push({
        'id': id,
        comment: c, author: n, upvotes: 0
      });
      result = true;
    }
    return result;
  },
  upvoteComment: (postId, commentId) => {
    let result = false;
    const post = stubAPI.getPost(postId);
    if (post) {
      const index = _.findIndex(post.comments, function (c) {
        return c.id == commentId;
      });
      if (index !== -1) {
        post.comments[index].upvotes += 1;
        result = true
      }
    }
    return result;
  }
}
export default stubAPI;