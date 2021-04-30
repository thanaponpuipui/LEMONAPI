const Pool = require('pg').Pool;

// use use pool connection so we don`t have to open/close it every time we make query
/* 
  * config database pool connection *
  host = where we host the database (develope state use localhost)
  user = database username (default = postgres)
  password = that user`s password
  database = name of the database (default = postgres)
  port = port where you run your DBserver (postgresql default port is 5432)
*/

let databaseConfig;

if (process.env.NODE_ENV === 'production') {
  databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  databaseConfig = {
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'testlemon',
    password: process.env.DB_PASSWORD,
    port: 5432,
  };
}

const pool = new Pool(databaseConfig);

module.exports = pool;
