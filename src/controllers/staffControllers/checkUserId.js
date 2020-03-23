const { verify } = require('../../utils/jwt');

const checkUserId = async (req, res, next) => {
  const { staffToken } = req.query;
  try {
    const verifiedToken = verify(staffToken);
    const staff = {
      id:verifiedToken.id,
      name:verifiedToken.name,
      position:verifiedToken.position,
    }
    const resData = {
      flag: 'success',
      message: `welcome`,
      data: staff
    };

    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = checkUserId;
