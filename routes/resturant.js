const router = require('express').Router();

const lemondb = require('../database/lemondb');

const authCheck = require('../middlewares/authorization');

const addResturant = require('../controllers/restControllers/addResturant');
const getAllResturant = require('../controllers/restControllers/getAllResturants');

router.post('/', authCheck, addResturant(lemondb))

router.get('/', authCheck, getAllResturant(lemondb))

module.exports = router