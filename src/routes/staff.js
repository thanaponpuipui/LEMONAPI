const router = require('express').Router();
const authCheck = require('../middlewares/authorization');
const getUserCon = require('../controllers/getConPath')('user');
// database
const lemondb = require('../database/lemondb');
// controllers
const checkUserId = require(getUserCon('checkUserId'));
const getAllStaffs = require('../controllers/userControllers/getAllStaffs');
const addStaff = require('../controllers/userControllers/addStaff');

router.post('/', authCheck, addStaff(lemondb));

router.get('/check', checkUserId(lemondb));

router.get('/:restId', authCheck, getAllStaffs(lemondb));

module.exports = router;