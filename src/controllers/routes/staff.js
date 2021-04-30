const router = require('express').Router();
const authCheck = require('../middlewares/authorization');
// controllers
const {
  checkUserId,
  getAllStaffs,
  getOwnerStaff,
  loginStaffNoPass,
} = require('../controllers/staffControllers');

router.post('/login-no-pass', authCheck, loginStaffNoPass);

router.get('/check', checkUserId);

router.get('/owner', authCheck, getOwnerStaff);

router.get('/', authCheck, getAllStaffs);

module.exports = router;
