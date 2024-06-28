import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import sequelize from '../../src/config/database';

describe('User APIs Test', () => {
  before(async () => {
    // Sync database
    await sequelize.sync({ force: true });
  });

  describe('POST /api/v1/users', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'testuser',
        email: 'testuser@example.com',
        mobile: '9999999999',
        password: 'Test@1234',
        role: 'admin'
      };

      const res = await request(app).post('/api/v1/users').send(userData);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).to.have.property('id');
      expect(res.body.data).to.have.property('name', userData.name);
      expect(res.body.data).to.have.property('email', userData.email);
    });

    it('should throw an error if email already exists', async () => {
      const userData = {
        name: 'testuser',
        email: 'testuser@example.com',
        mobile: '9999999999',
        password: 'Test@1234'
      };

      const res = await request(app).post('/api/v1/users').send(userData);

      expect(res.statusCode).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal(
        'User Already Exist for this Email or mobile Number'
      );
    });

    it('should return validation error for missing required fields', async () => {
      const userData = {
        name: 'testuser'
      };

      const res = await request(app).post('/api/v1/users').send(userData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('POST /api/v1/users/login', () => {
    it('should login a user successfully', async () => {
      const loginData = {
        email: 'testuser@example.com',
        password: 'Test@1234'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(loginData);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body)
        .to.have.property('message')
        .that.is.a('string', 'User login successfully');
      expect(res.body).to.have.property('token');
    });

    it('should return validation error for missing required fields', async () => {
      const loginData = {
        email: 'testuser@example.com'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(loginData);

      expect(res.statusCode).to.be.equal(400);
      expect(res.body).to.have.property('message');
    });

    it('should return error for invalid login credentials', async () => {
      const loginData = {
        email: 'wrongemail@example.com',
        password: 'wrongpassword'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(loginData);

      expect(res.statusCode).to.be.equal(400);
      expect(res.body).to.have.property('message').that.is.a('string');
    });
  });
});
