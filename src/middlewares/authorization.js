const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
    console.log("authCheck")
    const token = req.header('Authorization');
    if (!token) {
        const error = new Error('Not Authenticate.');
        error.errorCode = 401;
        throw error;
    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(token);
    } catch (err) {
        err.errorCode = 500;
        throw err;
    }
    if (!decodeToken) {
        const error = new Error('Not Authenticate.');
        error.errorCode = 401;
        throw error;
    }
    req.accId = decodeToken.accId;
    next();
}