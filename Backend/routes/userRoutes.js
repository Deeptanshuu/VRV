const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateToken, requireAdmin } = require('../middleware/auth');

// User management routes
router.get('/', validateToken, requireAdmin, userController.getAllUsers);
router.put('/:id/role', validateToken, requireAdmin, userController.updateUserRole);

module.exports = router; 