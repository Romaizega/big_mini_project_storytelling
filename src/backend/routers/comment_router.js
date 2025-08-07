const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByStory,
  deleteComment
} = require('../controllers/comment_controller');

const authenticateJWT = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, createComment);
router.get('/:story_id', authenticateJWT, getCommentsByStory);
router.delete('/:id', authenticateJWT, deleteComment);

module.exports = router;
