const contributorModel = require('../models/contributors_model');
const userModel = require('../models/users_model');

const addContributor = async (req, res) => {
  const { story_id, user_id } = req.body;

  if (!story_id || !user_id) {
    return res.status(400).json({ message: 'story_id and user_id are required' });
  }

  try {
    const contributor = await contributorModel.addContributor(story_id, user_id);
    res.status(201).json(contributor);
  } catch (err) {
    console.error('Add contributor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addContributorByUsername = async (req, res) => {
  const { story_id, username } = req.body;

  if (!story_id || !username) {
    return res.status(400).json({ message: 'story_id and username are required' });
  }

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [contributor] = await contributorModel.addContributor(story_id, user.id);
    res.status(201).json({ id: contributor.id, userId: user.id, username: user.username });
  } catch (err) {
    console.error('Add contributor by username error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getContributors = async (req, res) => {
  const { story_id } = req.params;

  try {
    const contributors = await contributorModel.getContributorsByStory(story_id);
    res.json(contributors);
  } catch (err) {
    console.error('Get contributors error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteContributor = async (req, res) => {
  const { id } = req.params;

  try {
    await contributorModel.deleteContributor(id);
    res.json({ message: 'Contributor removed successfully' });
  } catch (err) {
    console.error('Delete contributor error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addContributor,
  addContributorByUsername, 
  getContributors,
  deleteContributor
};
