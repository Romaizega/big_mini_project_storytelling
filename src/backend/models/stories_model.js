const db = require('../db/knex')

const getAllStories = () =>{
  return db('stories').select('*').orderBy('created_at', 'desc')
};

const getStoryById = (id) => {
  return db('stories').where({id}).first()
};

const createStory = async (title, content, author_id) => {
  const [story] = await db('stories')
    .insert({ title, content, author_id: author_id })
    .returning('*');
  return story;
};

const updateStory = async (id, title, content) => {
  const [story] = await db('stories')
    .where({ id })
    .update({ title, content, updated_at: db.fn.now() })
    .returning('*');
  return story;
};

const deleteStory = (id) => {
  return db('stories').where({ id }).del();
};

module.exports = {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
};