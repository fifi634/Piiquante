// Import plugins
const express = require('express');
const password = require('../middleware/password');

const router = express.Router();

// Controller import
const userCtrl = require('../controllers/user');

// Path
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

// Router export
module.exports = router;