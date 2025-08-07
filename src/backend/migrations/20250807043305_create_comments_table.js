exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.text('content').notNullable();
    table
      .integer('story_id')
      .unsigned()
      .references('id')
      .inTable('stories')
      .onDelete('CASCADE');
    table
      .integer('author_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
