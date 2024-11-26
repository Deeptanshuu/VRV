const User = require('./User');
const Role = require('./Role');

// Set up associations
Role.hasMany(User);
User.belongsTo(Role);

module.exports = {
  User,
  Role
}; 