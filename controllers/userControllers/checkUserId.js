const checkUserId = (db) => async (req, res, next) => {
    const { staffId, restId } = req.query;
    const sql = {
        text: 'SELECT name, ismanager FROM rest_staffs WHERE staff_id = $1 AND rest_id = $2',
        values: [staffId, restId],
    }
    try {
        const { rows } = await db.query(sql);
        if (rows.length <= 0) {
            const err = new Error('staff not found!');
            err.errorCode = 400;
            throw err;
        }

        const { name, ismanager } = rows[0];

        const resData = {
            staffId: staffId,
            staffName: name,
            isManager: ismanager,
        }

        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = checkUserId;