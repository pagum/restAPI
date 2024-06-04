const Pool = require("pg").Pool;
const config = require("platformsh-config").config();

let pool;

if (config.isValidPlatform()) {
  const credentials = config.credentials("database");

  pool = new Pool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.username,
    password: credentials.password,
    database: credentials.path,
  });
} else {
  pool = new Pool({
    user: "paulinagumienna",
    host: "localhost",
    database: "students",
    password: "postgres",
    port: 5432,
  });
}

module.exports = pool;
