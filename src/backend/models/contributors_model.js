const db = require('../db/knex');

const addContributor = async (storyId, userId) => {
  const [contributor] = await db('contributors')
    .insert({ story_id: storyId, user_id: userId })
    .returning('*');
  return contributor;
};

const getContributorsByStory = (storyId) => {
  return db('contributors')
    .where({ story_id: storyId })
    .join('users', 'contributors.user_id', 'users.id')
    .select('contributors.id', 'users.username', 'users.email');
};

const deleteContributor = (id) => {
  return db('contributors').where({ id }).del();
};

module.exports = {
  addContributor,
  getContributorsByStory,
  deleteContributor
};
