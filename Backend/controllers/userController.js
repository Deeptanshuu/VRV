const { User, Role } = require('../models');

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Role, attributes: ['name', 'permissions'] }],
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  },

  async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { roleId } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      await user.update({ RoleId: roleId });
      res.json({ message: 'User role updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
  }
};

module.exports = userController; 