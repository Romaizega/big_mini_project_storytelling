const express = require('express');
const { getStories,
  getStoryById, 
  createStory, 
  updateStory,
  deleteStory } = require('../controllers/stories_controller');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeStoryAccess  = require('../middleware/authStoryMiddleware');

const router = express.Router();

router.get('/', authenticateJWT, getStories);
router.get('/:id', authenticateJWT, getStoryById);
router.post('/', authenticateJWT, createStory);
router.patch('/:id', authenticateJWT, authorizeStoryAccess , updateStory);
router.delete('/:id', authenticateJWT, authorizeStoryAccess , deleteStory);

module.exports = router;
