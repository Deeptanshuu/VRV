const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const { app, server } = require('../app');
const sequelize = require('../config/database');
const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');

describe('User Management', () => {
  let adminToken;
  let userToken;
  let testUserId;
  let adminRoleId;
  let userRoleId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Create roles first
    console.log('\n🔧 Setting up test roles...');
    const adminRole = await Role.create({
      name: 'admin',
      permissions: ['read', 'write', 'delete', 'manage_users'],
      description: 'Administrator role'
    });
    console.log('✅ Admin role created');

    const userRole = await Role.create({
      name: 'user',
      permissions: ['read'],
      description: 'Regular user role'
    });
    console.log('✅ User role created');

    adminRoleId = adminRole.id;
    userRoleId = userRole.id;

    // Create test users
    console.log('\n🔧 Setting up test users...');
    const admin = await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'admin123',
      RoleId: adminRole.id
    });
    console.log('✅ Admin user created');

    const regularUser = await User.create({
      username: 'user',
      email: 'user@test.com',
      password: 'user123',
      RoleId: userRole.id
    });
    console.log('✅ Regular user created');

    // Generate tokens
    adminToken = jwt.sign(
      { userId: admin.id, role: 'admin' },
      process.env.JWT_SECRET
    );
    userToken = jwt.sign(
      { userId: regularUser.id, role: 'user' },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/users', () => {
    it('should allow admin to get all users', async () => {
      console.log('\n🧪 Testing: Admin fetching all users');
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(2);
      console.log('✅ Test passed: Admin can fetch all users');
    });

    it('should not allow regular user to get all users', async () => {
      console.log('\n🧪 Testing: Regular user attempting to fetch all users');
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
      console.log('✅ Test passed: Regular user cannot fetch all users');
    });
  });

  describe('User Registration Flow', () => {
    it('should register a new user', async () => {
      console.log('\n🧪 Testing: New user registration');
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'newuser@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
      console.log('✅ Test passed: New user registered successfully');

      // Save the user ID for later tests
      const user = await User.findOne({ where: { email: 'newuser@test.com' } });
      testUserId = user.id;
    });

    it('should prevent duplicate email registration', async () => {
      console.log('\n🧪 Testing: Duplicate email registration');
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'duplicate',
          email: 'newuser@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
      console.log('✅ Test passed: Duplicate email registration prevented');
    });
  });

  describe('User Role Management', () => {
    it('should allow admin to update user role', async () => {
      console.log('\n🧪 Testing: Admin updating user role');
      const res = await request(app)
        .put(`/api/users/${testUserId}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          roleId: adminRoleId
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User role updated successfully');
      console.log('✅ Test passed: Admin can update user role');
    });

    it('should not allow regular user to update roles', async () => {
      console.log('\n🧪 Testing: Regular user attempting to update role');
      const res = await request(app)
        .put(`/api/users/${testUserId}/role`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          roleId: adminRoleId
        });

      expect(res.statusCode).toBe(403);
      console.log('✅ Test passed: Regular user cannot update roles');
    });
  });

  describe('User Authentication', () => {
    it('should login successfully with correct credentials', async () => {
      console.log('\n🧪 Testing: User login with correct credentials');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'newuser@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      console.log('✅ Test passed: User can login with correct credentials');
    });

    it('should reject login with incorrect password', async () => {
      console.log('\n🧪 Testing: User login with incorrect password');
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'newuser@test.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
      console.log('✅ Test passed: Login rejected with incorrect password');
    });
  });

  describe('User Profile', () => {
    it('should fetch user profile with valid token', async () => {
      console.log('\n🧪 Testing: Fetching user profile');
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('email');
      console.log('✅ Test passed: User profile fetched successfully');
    });

    it('should reject profile fetch with invalid token', async () => {
      console.log('\n🧪 Testing: Fetching profile with invalid token');
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid_token');

      expect(res.statusCode).toBe(401);
      console.log('✅ Test passed: Profile fetch rejected with invalid token');
    });
  });
}); 