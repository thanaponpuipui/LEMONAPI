const { selectAllBranches: getBranches } = require('../../models/branches');

const getAllBranches = async (req, res, next) => {
  const accountId = req.accountId;
  try {
    const branchList = await getBranches({ accountId });
    const resData = {
      flag: 'success',
      message: 'geting branches success!',
      data: branchList,
    };
    res.status(200).json(resData);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = getAllBranches;
