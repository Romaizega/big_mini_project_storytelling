const commentModel = require('../models/comments_model');

const createComment = async (req, res) => {
  const { story_id, content } = req.body;

  if (!story_id || !content) {
    return res.status(400).json({ message: 'story_id and content are required' });
  }

  try {
    const comment = await commentModel.createComment(story_id, req.user.userId, content);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCommentsByStory = async (req, res) => {
  const { story_id } = req.params;

  try {
    const comments = await commentModel.getCommentsByStoryId(story_id);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await commentModel.deleteComment(id, req.user.userId);
    if (deleted) {
      res.json({ message: 'Comment deleted' });
    } else {
      res.status(403).json({ message: 'Not allowed to delete this comment' });
    }
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByStory,
  deleteComment,
};
