const router = require('express').Router();
const lemondb = require('../../../database/lemondb');

// controllers
const login = require('./login');
const register = require('./register');
const check = require('./check');

router.post('/login', login(lemondb));
// demo plan
router.post('/register', register(lemondb));

router.get('/check', check);

module.exports = router;
