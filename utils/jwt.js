const jwt = require('jsonwebtoken');

const secreatToken = process.env.SECREAT_TOKEN;
// Synchronous function
function sign (tokenInfo) {
    return jwt.sign(tokenInfo, secreatToken);
}
function verify (token) {
    return jwt.verify(token, secreatToken);
}

module.exports = {
    sign,
    verify,
}