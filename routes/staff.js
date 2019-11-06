const router = require('express').Router();
const authCheck = require('../middlewares/authorization');
// database
const lemondb = require('../database/lemondb');
// controllers
const getAllStaffs = require('../controllers/userControllers/getAllStaffs');
const addStaff = require('../controllers/userControllers/addStaff');

router.post('/', authCheck, addStaff(lemondb));

router.get('/:restId', authCheck, getAllStaffs(lemondb));

module.exports = router;