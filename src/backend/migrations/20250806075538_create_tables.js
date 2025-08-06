exports.up = function (knex) {
  return knex.schema
    // 1. Users
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 50).notNullable();
      table.string('email', 100).unique().notNullable();
      table.text('password_hash').notNullable();
    })
    // 2. Stories
    .createTable('stories', function (table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('content').notNullable();
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    // 3. Contributors
    .createTable('contributors', function (table) {
      table.increments('id').primary();
      table
        .integer('story_id')
        .unsigned()
        .references('id')
        .inTable('stories')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('contributors')
    .dropTableIfExists('stories')
    .dropTableIfExists('users');
};
