const { selectAllBranchStaffs } = require('../../models/staffs');
const { isBranchOf } = require('../../models/branches');

const getAllStaffs = async (req, res, next) => {
  const accountId = req.accountId;
  const { branchId } = req.query;
  try {
    if (!(await isBranchOf({ accountId, branchId }))) {
      const err = new Error('cannot get staff from this branch');
      err.errorCode = 400;
      throw err;
    }
    const staffs = await selectAllBranchStaffs({ accountId, branchId });

    const response = {
      flag: 'success',
      message: "Successfully get all branch's staffs!",
      data: staffs,
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
module.exports = getAllStaffs;