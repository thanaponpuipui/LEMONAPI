const addRest = db => async (req, res, next) => {
  const accId = req.accountId;
  const { restName } = req.body;
  console.log(restName);

  const query = {
    text: 'INSERT INTO resturants(rest_name, acc_id) values($1, $2) RETURNING rest_id',
    values: [restName, accId],
  };
  try {
    const { rows } = await db.query(query);
    const { rest_id } = rows[0];

    res.status(200).json({ rest_id });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = addRest;
