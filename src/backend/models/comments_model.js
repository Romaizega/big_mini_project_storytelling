const db = require('../db/knex');

const createComment = async (storyId, userId, content) => {
  const [comment] = await db('comments')
    .insert({ story_id: storyId, user_id: userId, content })
    .returning('*');
  return comment;
};

const getCommentsByStoryId = async (storyId) => {
  return db('comments')
    .where({ story_id: storyId })
    .join('users', 'comments.user_id', 'users.id')
    .select('comments.id', 'comments.content', 'comments.created_at', 'users.username as author');
};

const deleteComment = async (id, userId) => {
  return db('comments')
    .where({ id, user_id: userId }) // The author could delete comments
    .del();
};

module.exports = {
  createComment,
  getCommentsByStoryId,
  deleteComment,
};
