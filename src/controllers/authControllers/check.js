const jwt = require('../../utils/jwt');

const check = (req, res, next) => {
    const token = req.query.token;
    let decodeToken;
    try {
        decodeToken = jwt.verify(token);
    } catch (e) {
        e.errorCode = 500;
        console.log(e);
        throw e;
    }

    const { accId, username } = decodeToken;

    const resData = {
        accId,
        username,
        token,
    }

    return res.status(200).json(resData);
}

module.exports = check;