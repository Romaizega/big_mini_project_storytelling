const express = require('express');
const {
  addContributor,
  addContributorByUsername, 
  getContributors,
  deleteContributor
} = require('../controllers/contributor_controller');

const authenticateJWT = require('../middleware/authMiddleware');
const authorizeStoryAuthor = require('../middleware/authConrtibutorMiddleware');

const router = express.Router();


router.post('/by-username', authenticateJWT, authorizeStoryAuthor, addContributorByUsername);
router.post('/', authenticateJWT, authorizeStoryAuthor, addContributor);
router.get('/:story_id', authenticateJWT, getContributors);
router.delete('/:id', authenticateJWT, authorizeStoryAuthor, deleteContributor);

module.exports = router;
