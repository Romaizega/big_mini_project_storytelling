const db = require('../db/knex');

const getUserById = (id) => {
  return db('users').where({ id }).first();
};

const getUserByUsername = (username) => {
  return db('users').where({ username }).first();
};

const getUserByEmail = (email) => {
  return db('users').where({ email }).first();
};

const createUser = async (username, email, passwordHash) => {
  const [user] = await db('users')
    .insert({ username, email, password_hash: passwordHash })
    .returning('*');
  return user;
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
};
