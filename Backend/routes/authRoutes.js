const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateToken } = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', validateToken, authController.logout);
router.get('/profile', validateToken, authController.getProfile);

module.exports = router; 