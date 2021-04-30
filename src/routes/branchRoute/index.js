const router = require('express').Router();

const lemondb = require('../../database/lemondb');
const authCheck = require('../../middlewares/authorization');

const addBranch = require("./addBranch");
const getAllBranches = require("./getAllBranches")
const checkBranchId = require("./checkBranchId")

router.post('/', authCheck, addBranch(lemondb));

router.get('/', authCheck, getAllBranches);

router.get('/check', checkBranchId(lemondb));

module.exports = router;
