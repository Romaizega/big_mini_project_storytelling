const storyModel = require('../models/stories_model');

const authorizeStoryAuthor = async (req, res, next) => {
  const { story_id, } = req.params; 
  const storyId = story_id || req.body.story_id; // 

  const story = await storyModel.getStoryById(storyId);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  if (story.author_id !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to modify contributors for this story' });
  }

  next();
};

module.exports = authorizeStoryAuthor;
