const router = require('express').Router();
const getRestPath = require('../controllers/getConPath')('rest');
const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const addResturant = require(getRestPath('addResturant'));
const getAllResturant = require(getRestPath('getAllResturants'));
const checkRestId = require(getRestPath('checkRestId'))

router.post('/', authCheck, addResturant(lemondb));

router.get('/', authCheck, getAllResturant(lemondb));

router.get('/check', checkRestId(lemondb));

module.exports = router