const { Sequelize } = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const dbPath = env === 'test' 
  ? ':memory:'
  : path.join(__dirname, '../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: env === 'test' ? false : console.log
});

module.exports = sequelize; 