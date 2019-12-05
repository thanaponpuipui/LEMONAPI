const router = require('express').Router();
const authCheck = require('../middlewares/authorization');
const getUserCon = require('../controllers/getConPath')('user');
// database
const lemondb = require('../database/lemondb');
// controllers
const checkUserId = require(getUserCon('checkUserId'));
const getAllStaffs = require('../controllers/userControllers/getAllStaffs');
const addStaff = require('../controllers/userControllers/addStaff');
const loginStaff = require(getUserCon('loginStaff'));

router.post('/', authCheck, addStaff);

router.post('/login', authCheck, loginStaff);

router.get('/check', checkUserId(lemondb));

router.get('/:restId', authCheck, getAllStaffs(lemondb));

module.exports = router;
