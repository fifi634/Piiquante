// Import plugins
const express = require('express');
const password = require('../middleware/password');
const limiter = require('../middleware/limiter');

const router = express.Router();

// Controller import
const userCtrl = require('../controllers/user');

// Endpoint
router.post('/signup', password, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

// Router export
module.exports = router;