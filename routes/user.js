// Express import
const express = require('express');
const router = express.Router();

// Controller import
const userCtrl = require('../controllers/user');

// Path
router.post('/signup', userCtrl.signup);
router.post('login', userCtrl.login);

// Router export
module.exports = router;