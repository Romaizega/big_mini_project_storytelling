const knex = require('knex')
require('dotenv').config({ path: __dirname + '/../.env' });

const db = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: {rejectUnauthorized: false}
  }
})

module.exports = db