/* 
* @response {Json Object} restId, restName
* if Error @response {Json Object} message
*/

const checkRestId = (db) => async (req, res, next) => {
    const { restId, accId } = req.query;
    // validation pending
    const sql = {
        text: 'SELECT rest_name FROM resturants WHERE rest_id = $1 AND acc_id = $2',
        values: [restId, accId]
    }
    try {
        const { rows } = await db.query(sql);
        if (rows.length <= 0) {
            const err = new Error('branch not found!');
            err.errorCode = 400;
            throw err;
        }
        const { rest_name } = rows[0];
        const resData = {
            branchId: restId,
            branchName: rest_name,
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = checkRestId;