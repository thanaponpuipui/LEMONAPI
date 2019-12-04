const bcrypt = require('bcrypt');

const saltRound = 12;
// async function
function hash (password) {
    return bcrypt.hash(password, saltRound);
}

function compare (password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = {
    hash,
    compare,
}