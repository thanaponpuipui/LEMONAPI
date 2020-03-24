const jwt = require('../../utils/jwt');

const loginStaffNoPass = (req, res, next) => {
  const { staffId, firstName, position } = req.body;
  try {
    const staffToken = jwt.sign({ id: staffId, name: firstName, position });
    const staff = {
      token: staffToken,
      id: staffId,
      name: firstName,
      position,
    };
    const resData = {
      flag: 'success',
      message: 'staff login success',
      data: staff,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = loginStaffNoPass;
