const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  node_env: process.env.NODE_ENV,
  dbPasword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbUrl: process.env.DATABASE_URL,
};
