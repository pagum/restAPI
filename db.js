const Pool = require("pg").Pool;

const pool = new Pool({
  user: "paulinagumienna",
  host: "localhost",
  database: "students",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
