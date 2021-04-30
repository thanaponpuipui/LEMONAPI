const { getOwnerStaff: getOwnerStaffModel } = require('../../../models/staffs');

const getOwnerStaff = async (req, res, next) => {
  const accountId = req.accountId;
  try {
    const staff = await getOwnerStaffModel({ accountId });
    const resData = {
      flag: 'success',
      message: 'get owner as staff user success!',
      data: staff,
    };
    res.status(200).json(resData);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = getOwnerStaff;
