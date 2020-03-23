/*
 * @response {Json Object} restId, restName
 * if Error @response {Json Object} message
 */

const checkRestId = db => async (req, res, next) => {
  const { branchId, accountId } = req.query;
  // validation pending
  const sql = {
    text: 'SELECT branch_name FROM branches WHERE branch_id = $1 AND account_id = $2',
    values: [branchId, accountId],
  };
  try {
    const { rows } = await db.query(sql);
    if (rows.length <= 0) {
      const err = new Error('branch not found!');
      err.errorCode = 400;
      throw err;
    }
    const { branch_name } = rows[0];
    const resData = {
      id: branchId,
      name: branch_name,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = checkRestId;
