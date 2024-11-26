const { Role } = require('../models');

const roleController = {
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
  },

  async createRole(req, res) {
    try {
      const { name, permissions, description } = req.body;
      const role = await Role.create({ name, permissions, description });
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: 'Error creating role', error: error.message });
    }
  },

  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name, permissions, description } = req.body;
      
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      if (role.name === 'admin') {
        return res.status(400).json({ message: 'Cannot modify admin role' });
      }

      await role.update({ name, permissions, description });
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: 'Error updating role', error: error.message });
    }
  },

  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      if (role.name === 'admin') {
        return res.status(400).json({ message: 'Cannot delete admin role' });
      }

      await role.destroy();
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
  }
};

module.exports = roleController; 