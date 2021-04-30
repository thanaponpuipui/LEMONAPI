const router = require('express').Router();
const authCheck = require('../../middlewares/authorization');

// controllers
const loginStaffNoPass = require("./loginStaffNoPass");
const checkUserId = require("./checkUserId");
const getAllStaffs = require("./getAllStaffs");
const getOwnerStaff = require("./getOwnerStaff");

router.post('/login-no-pass', authCheck, loginStaffNoPass);

router.get('/check', checkUserId);

router.get('/owner', authCheck, getOwnerStaff);

router.get('/', authCheck, getAllStaffs);

module.exports = router;
