// Express import
const express = require('express');
const router = express.Router();

// Authentification by token import
const auth = require('../middleware/auth');

// Multer import (file import)
const multer = require('../middleware/multer-config');

// Controller import
const sauceCtrl = require('../controllers/sauce');

// Path
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

// Sauce router export
module.exports = router;


