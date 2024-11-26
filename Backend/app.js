const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

let server;

// Function to start server
const startServer = async () => {
  await sequelize.sync();
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  return server;
};

// Start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(err => console.error('Server start error:', err));
}

// Export for testing
module.exports = { app, startServer }; 