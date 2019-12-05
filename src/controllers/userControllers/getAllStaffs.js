const getAllStaffs = db => async (req, res, next) => {
  const restId = req.params.restId;

  try {
    const query = {
      text: `SELECT 
                        staff_id "staffId",
                        name,
                        avatar,
                        ismanager "isManager"
                    FROM rest_staffs
                    WHERE rest_id = $1`,
      values: [restId],
    };
    const { rows } = await db.query(query);
    let message;
    if (rows.length <= 0) {
      message = 'no staff found!';
    }
    const staffList = [];
    rows.forEach(row => {
      staffList.push(row);
    });
    const resData = {
      flag: 'success',
      message,
      data: staffList,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = getAllStaffs;
