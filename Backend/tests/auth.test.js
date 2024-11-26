const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const { app, server } = require('../app');
const sequelize = require('../config/database');
const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');

describe('Authentication System', () => {
  let validToken;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    console.log('\n🔧 Setting up initial roles...');
    await Role.create({
      name: 'admin',
      permissions: ['read', 'write', 'delete', 'manage_users'],
      description: 'Administrator role'
    });
    console.log('✅ Admin role created');

    await Role.create({
      name: 'user',
      permissions: ['read'],
      description: 'Basic user role'
    });
    console.log('✅ Basic user role created');
  });

  afterAll(async () => {
    await sequelize.close();
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve);
      });
    }
  });

  describe('User Registration', () => {
    it('should validate required fields', async () => {
      console.log('\n🧪 Testing: Registration with missing fields');
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com'
          // missing username and password
        });

      expect(res.statusCode).toBe(400);
      console.log('✅ Test passed: Registration requires all fields');
    });

    it('should validate email format', async () => {
      console.log('\n🧪 Testing: Registration with invalid email');
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
      console.log('✅ Test passed: Invalid email format rejected');
    });

    it('should successfully register valid user', async () => {
      console.log('\n🧪 Testing: Valid user registration');
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      console.log('✅ Test passed: Valid user registration successful');
    });

    it('should assign default user role', async () => {
      console.log('\n🧪 Testing: Default role assignment');
      const user = await User.findOne({
        where: { email: 'test@test.com' },
        include: [{ model: Role }]
      });

      expect(user.Role.name).toBe('user');
      console.log('✅ Test passed: Default role assigned correctly');
    });
  });

  describe('User Login', () => {
    it('should validate login credentials', async () => {
      console.log('\n🧪 Testing: Login with missing credentials');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com'
          // missing password
        });

      expect(res.statusCode).toBe(400);
      console.log('✅ Test passed: Login requires all credentials');
    });

    it('should reject invalid email', async () => {
      console.log('\n🧪 Testing: Login with non-existent email');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(401);
      console.log('✅ Test passed: Non-existent email rejected');
    });

    it('should reject wrong password', async () => {
      console.log('\n🧪 Testing: Login with wrong password');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      console.log('✅ Test passed: Wrong password rejected');
    });

    it('should login successfully with correct credentials', async () => {
      console.log('\n🧪 Testing: Login with correct credentials');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      console.log('✅ Test passed: Login successful');
    });
  });

  describe('Token Validation', () => {
    beforeAll(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'tokentest',
          email: 'token@test.com',
          password: 'password123'
        });

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'token@test.com',
          password: 'password123'
        });
      validToken = loginRes.body.token;
    });

    it('should accept valid token', async () => {
      console.log('\n🧪 Testing: Using valid token');
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      console.log('✅ Test passed: Valid token accepted');
    });

    it('should reject expired token', async () => {
      console.log('\n🧪 Testing: Using expired token');
      const expiredToken = jwt.sign(
        { userId: 1, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '0s' }
      );

      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.statusCode).toBe(401);
      console.log('✅ Test passed: Expired token rejected');
    });

    it('should reject invalid token format', async () => {
      console.log('\n🧪 Testing: Using invalid token format');
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token-format');

      expect(res.statusCode).toBe(401);
      console.log('✅ Test passed: Invalid token format rejected');
    });
  });

  describe('Logout', () => {
    it('should successfully logout', async () => {
      console.log('\n🧪 Testing: User logout');
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
      console.log('✅ Test passed: Logout successful');
    });
  });
}); 