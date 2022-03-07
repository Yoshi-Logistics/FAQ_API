const { Pool } = require('pg');
const { password } = require('./pass')

const pool = new Pool ({
  user: 'postgres',
  password: `${password}`,
  database: 'questionsandanswers',
  host: 'localhost',
  port: 5432
})

module.exports = pool;