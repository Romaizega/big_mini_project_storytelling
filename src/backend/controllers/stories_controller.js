const storyModel = require('../models/stories_model');

const getStories = async (req, res) => {
  try {
    const stories = await storyModel.getAllStories();
    res.json(stories);
  } catch (err) {
    console.error('Get stories error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStoryById = async (req, res) => {
  try {
    const {id} = req.params
    const story = await storyModel.getStoryById(id);
    if(!story) { res.status(404).json({ message: 'Story not found' })
      return 
    }
    res.status(200).json(story)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server error"})
    
    
  }
}

const createStory = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const story = await storyModel.createStory(title, content, req.user.userId);
    res.status(201).json({message: "Story createsd", story});
    console.log('req.user from JWT:', req.user);

  } catch (err) {
    console.error('Create story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStory = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const story = await storyModel.updateStory(id, title, content);
    res.json(story);
  } catch (err) {
    console.error('Update story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    await storyModel.deleteStory(id);
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Delete story error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
};
