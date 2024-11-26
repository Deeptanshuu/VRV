const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      // Validate required fields
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Get default role
      const defaultRole = await Role.findOne({ where: { name: 'user' } });
      if (!defaultRole) {
        return res.status(500).json({ message: 'Default role not found' });
      }

      // Create new user
      const user = await User.create({
        username,
        email,
        password,
        RoleId: defaultRole.id
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      // Find user
      const user = await User.findOne({
        where: { email },
        include: [{ model: Role }]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.Role.name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.Role.name
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },

  async logout(req, res) {
    res.json({ message: 'Logged out successfully' });
  },

  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.userId, {
        include: [{ model: Role }],
        attributes: { exclude: ['password'] }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  }
};

module.exports = authController; 