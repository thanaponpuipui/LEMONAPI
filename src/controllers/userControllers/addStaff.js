const { sign } = require('../../utils/jwt');
const { hash } = require('../../utils/crypt');
const { addStaffValidate } = require('../../validation/tempValidate');

const { insert } = require('../../models/staff/restStaffs.model');

const addStaff = async (req, res, next) => {
    const { name, isManager, phoneNo, password, restId } = req.body;
    const validateData =  { name, phoneNo, password, isManager };
    
    try {
        const hashPass = await hash(password);
        const { error } = addStaffValidate(validateData);
        if (error) {
            const message = error.details[0].message.replace(/"/g, '');
            const err = new Error(message);
            err.errorCode = '400';
            throw err;
        }
        const insertData = {
            name,
            isManager,
            phoneNo,
            password: hashPass,
        }
        const staffId = await insert(insertData, restId);
        const staffToken = sign({staffId});
        const resData = {
            flag: 'success',
            message:`${name} added`,
            data: {
                staffId: staffId,
                staffName: name,
                isManager: isManager,
                staffToken: staffToken
            }
        }
        res.status(200).json(resData);
    } catch (e) {
        next(e);
    }
}

module.exports = addStaff;