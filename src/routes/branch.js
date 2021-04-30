const router = require('express').Router();
const lemondb = require('../config/lemondb');

const authCheck = require('../middlewares/authorization');

const { addBranch, checkBranchId, getAllBranches } = require('../controllers/branchControllers');

router.post('/', authCheck, addBranch(lemondb));

router.get('/', authCheck, getAllBranches);

router.get('/check', checkBranchId(lemondb));

module.exports = router;
