const dotenv = require('dotenv');

dotenv.config()

moduld.exports = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
}