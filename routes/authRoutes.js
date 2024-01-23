const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.PostRegisterUser);
router.post('/login', authController.PostLoginUser);
router.delete('/logout', authController.LogoutUser);

module.exports = router;