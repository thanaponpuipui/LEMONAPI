const getAllStock = db => async (req, res, next) => {
  const restId = req.params.Id;

  // use restId
  const sql = {
    text: 'SELECT * FROM ingredients WHERE rest_id = $1',
    values: [restId],
  };
  try {
    const { rows } = await db.query(sql);
    const message = rows.length <= 0 ? 'no stock found!' : `successfully get:${rows.length} items`;
    const data = [];
    for (let i = 0; i < rows.length; i++) {
      const { ingredient_id, ingredient_name, details } = rows[i];
      const pushData = {
        id: ingredient_id,
        name: ingredient_name,
        details: details,
      };
      data.push(pushData);
    }
    const resData = {
      flag: 'success',
      message: message,
      data: data,
    };
    res.status(200).json(resData);
  } catch (e) {
    next(e);
  }
};

module.exports = getAllStock;
