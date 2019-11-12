const { addStaffValidate } = require('../../validation/tempValidate');

const addStaff = (db) => async (req, res, next) => {
    const { name, isManager, phoneNo, password, restId } = req.body;
    try {
        const { err } = addStaffValidate(req.body);
        if (err) {
            const error = new Error('validation error');
            error.errorCode = '400';
            throw error;
        }
        let queryText;
        let insertValues;
        if (!password) {
            queryText = 'INSERT INTO rest_staffs(name, ismanager, phone_no, rest_id) values($1, $2, $3, $4)'
            insertValues = [name, isManager, phoneNo, restId]
        } else {
            queryText = 'INSERT INTO rest_staffs(name, login_password, ismanager, phone_no, rest_id) values($1, $2, $3, $4, $5)'
            insertValues = [name, password, isManager, phoneNo, restId]
        }
        await db.query(queryText, insertValues);
        const resData = {
            message:`${name} added`,
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = addStaff;