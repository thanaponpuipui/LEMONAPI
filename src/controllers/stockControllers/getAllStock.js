const getAllStock = (db) => async (req, res, next) => {
    const restId = req.query.restId;

    // use restId
    const sql = {
        text: 'SELECT * FROM ingredients WHERE rest_id = $1',
        values: [restId],
    }
    try {
        const { rows } = await db.query(sql);
        if (rows.length <= 0) {
            const err = new Error('stock empty!');
            err.errorCode = 400;
            throw err;
        }
        const resData = [];
        for (let i = 0; i < rows.length; i++) {
            const { ingredient_id, ingredient_name, details } = rows[i];
            const pushData = {
                id: ingredient_id,
                name: ingredient_name,
                details: details,
            }
            resData.push(pushData);
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = getAllStock;