const getAllStaffs = (db) => async (req, res, next) => {
    const restId = req.params.restId;
    
    try {
        const query = {
            text: "SELECT staff_id as staffId, name, avatar, ismanager as isManager FROM rest_staffs WHERE rest_id = $1",
            values: [restId],
        }
        const { rows } = await db.query(query);
        if (rows.length < 1) {
            const error = new Error('0 staff');
            error.errorCode = 400;
            throw error;
        }
        const staffList = [];
        rows.foreach(row => {
            staffList.push(row);
        })
        res.status(200).json(staffList);
    } catch (e) {
        next(e);
    }
}

module.exports = getAllStaffs;