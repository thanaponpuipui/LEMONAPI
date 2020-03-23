const router = require('express').Router();
const getBranchPath = require('../controllers/getConPath')('branch');
const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const addBranch = require(getBranchPath('addBranch'));
const getAllBranches = require(getBranchPath('getAllBranches'));
const checkBranchId = require(getBranchPath('checkBranchId'));

router.post('/', authCheck, addBranch(lemondb));

router.get('/', authCheck, getAllBranches);

router.get('/check', checkBranchId(lemondb));

module.exports = router;
