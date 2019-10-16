const router = require('express').Router();

const lemondb = require('../database/lemondb');

// controllers
const login = require('../controllers/authControllers/login');
const register = require('../controllers/authControllers/register');

router.post('/login', login(lemondb));

router.post('/register', register(lemondb));

module.exports = router;