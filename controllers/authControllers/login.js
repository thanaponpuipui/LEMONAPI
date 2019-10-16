const jwt = require('../../utils/jwt');
const crypt = require('../../utils/crypt');

const login = (db) => (req, res) => {
    // no firebase version first
    const { username, password } = req.body;
    // check if username is valid
    // compare password
    // return error if anyof above not correct
    
} 

module.exports = login