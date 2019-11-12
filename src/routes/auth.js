const router = require('express').Router();

const lemondb = require('../database/lemondb');

// controllers
const login = require('../controllers/authControllers/login');
const register = require('../controllers/authControllers/register');
const check = require('../controllers/authControllers/check');

router.post('/login', login(lemondb));
// demo plan
router.post('/register', register(lemondb));

router.get('/check', check);

module.exports = router;