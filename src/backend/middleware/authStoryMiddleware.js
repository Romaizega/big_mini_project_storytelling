const storyModel = require('../models/stories_model');
const contributorModel = require('../models/contributors_model');

const authorizeStoryAccess = async (req, res, next) => {
  const { id } = req.params; 
  const userId = req.user.userId;

  try {
    const story = await storyModel.getStoryById(id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }


    if (story.author_id === userId) {
      return next();
    }


    const contributors = await contributorModel.getContributorsByStory(id);
    const isContributor = contributors.some(c => c.id === userId);

    if (!isContributor) {
      return res.status(403).json({ message: 'You are not authorized to modify this story' });
    }

    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authorizeStoryAccess;

