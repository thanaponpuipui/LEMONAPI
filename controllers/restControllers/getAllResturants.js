const getAllResturants = (db) => async (req, res, next) => {
    // get accId from header
    const accId = req.accId;
    // find all acc's rest from db
    try {
        const { rows } = await db.query(
            'SELECT * FROM resturants WHERE acc_id = $1',
            [accId]
        )

        const resData = [];

        for(let i = 0; i < rows.length; i++) {
            const { rest_name, rest_id } = rows[i];
            const rest = {
                name: rest_name,
                id: rest_id,
            }
            resData.push(rest);
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }

    // response datas = {restId, rest name, No of Staff}
}

module.exports = getAllResturants;