const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const { app, server } = require('../app');
const sequelize = require('../config/database');
const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');

describe('Role Management', () => {
  let adminToken;
  let userToken;
  let testRoleId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    console.log('\n🔧 Setting up initial roles...');
    // Create admin role
    const adminRole = await Role.create({
      name: 'admin',
      permissions: ['read', 'write', 'delete', 'manage_roles'],
      description: 'Administrator role'
    });
    console.log('✅ Admin role created');

    // Create user role
    const userRole = await Role.create({
      name: 'user',
      permissions: ['read'],
      description: 'Basic user role'
    });
    console.log('✅ Basic user role created');

    console.log('\n🔧 Setting up test users...');
    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'admin123',
      RoleId: adminRole.id
    });
    console.log('✅ Admin user created');

    // Create regular user
    const user = await User.create({
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
      { userId: user.id, role: 'user' },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Role Listing', () => {
    it('should allow admin to get all roles', async () => {
      console.log('\n🧪 Testing: Admin fetching all roles');
      const res = await request(app)
        .get('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(2);
      console.log('✅ Test passed: Admin can fetch all roles');
    });

    it('should allow user to view roles', async () => {
      console.log('\n🧪 Testing: User fetching all roles');
      const res = await request(app)
        .get('/api/roles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      console.log('✅ Test passed: User can view roles');
    });
  });

  describe('Role Creation', () => {
    it('should allow admin to create new role', async () => {
      console.log('\n🧪 Testing: Admin creating new role');
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'moderator',
          permissions: ['read', 'write'],
          description: 'Moderator role'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'moderator');
      testRoleId = res.body.id;
      console.log('✅ Test passed: Admin can create new role');
    });

    it('should prevent duplicate role names', async () => {
      console.log('\n🧪 Testing: Creating duplicate role');
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'moderator',
          permissions: ['read'],
          description: 'Duplicate moderator role'
        });

      expect(res.statusCode).toBe(500);
      console.log('✅ Test passed: Duplicate role creation prevented');
    });

    it('should not allow user to create role', async () => {
      console.log('\n🧪 Testing: User attempting to create role');
      const res = await request(app)
        .post('/api/roles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'test_role',
          permissions: ['read'],
          description: 'Test role'
        });

      expect(res.statusCode).toBe(403);
      console.log('✅ Test passed: User cannot create roles');
    });
  });

  describe('Role Updates', () => {
    it('should allow admin to update role', async () => {
      console.log('\n🧪 Testing: Admin updating role');
      const res = await request(app)
        .put(`/api/roles/${testRoleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'moderator_updated',
          permissions: ['read', 'write', 'moderate'],
          description: 'Updated moderator role'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('moderator_updated');
      console.log('✅ Test passed: Admin can update roles');
    });

    it('should not allow user to update role', async () => {
      console.log('\n🧪 Testing: User attempting to update role');
      const res = await request(app)
        .put(`/api/roles/${testRoleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'moderator_fail',
          permissions: ['read'],
          description: 'Should fail'
        });

      expect(res.statusCode).toBe(403);
      console.log('✅ Test passed: User cannot update roles');
    });
  });

  describe('Role Deletion', () => {
    it('should not allow deletion of admin role', async () => {
      console.log('\n🧪 Testing: Attempting to delete admin role');
      const adminRole = await Role.findOne({ where: { name: 'admin' } });
      const res = await request(app)
        .delete(`/api/roles/${adminRole.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(400);
      console.log('✅ Test passed: Cannot delete admin role');
    });

    it('should allow admin to delete custom role', async () => {
      console.log('\n🧪 Testing: Admin deleting custom role');
      const res = await request(app)
        .delete(`/api/roles/${testRoleId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      console.log('✅ Test passed: Admin can delete custom roles');
    });

    it('should not allow user to delete role', async () => {
      console.log('\n🧪 Testing: User attempting to delete role');
      const res = await request(app)
        .delete(`/api/roles/${testRoleId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
      console.log('✅ Test passed: User cannot delete roles');
    });
  });
}); 