const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { validateToken, requireAdmin } = require('../middleware/auth');

// Role management routes
router.get('/', validateToken, roleController.getAllRoles);
router.post('/', validateToken, requireAdmin, roleController.createRole);
router.put('/:id', validateToken, requireAdmin, roleController.updateRole);
router.delete('/:id', validateToken, requireAdmin, roleController.deleteRole);

module.exports = router; 