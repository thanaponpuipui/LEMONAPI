const { sign } = require('../../utils/jwt');
const { compare } = require('../../utils/crypt');

const { getOneStaff } = require('../../models/staff/restStaffs.model');

const loginStaff = async (req, res, next) => {
  const { staffId, password, restId } = req.body;
  try {
    const staff = await getOneStaff(staffId, restId);
    const { password: hash, name, isManager } = staff;
    console.log(staff)
    if (!hash) {
      const err = new Error('no staff found');
      err.errorCode = 400;
      throw err;
    }
    const match = await compare(password, hash);
    if (!match) {
      const err = new Error('password incorrect');
      err.errorCode = 400;
      throw err;
    }

    const token = sign({staffId});
    const resData = {
      flag: 'success',
      message: 'staff successfully login',
      data: {
        staffToken: token,
        staffName: name,
        staffId: staffId,
        isManager: isManager,
      },
    }
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
}

module.exports = loginStaff;