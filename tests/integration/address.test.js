import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let authToken;
let addressId;

describe('Address APIs Test', () => {
  before(async () => {
    const userData = {
      name: 'testuser',
      email: 'testuser@example.com',
      mobile: '9999999999',
      password: 'Test@1234'
    };
    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password });

    authToken = loginRes.body.token;
  });

  describe('POST /api/v1/address', () => {
    it('should create a new address successfully', async () => {
      const addressData = {
        addressType: 'Work',
        addressLine1: 'Bridgelabz Hsr layout',
        addressLine2: 'Apt 1034',
        city: 'Banglore',
        state: 'Karnataka',
        postalCode: '560021',
        country: 'India'
      };

      const res = await request(app)
        .post('/api/v1/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(addressData);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).to.have.property('id');
      addressId = res.body.data.id;
    });

    it('should return validation error for missing fields', async () => {
      const addressData = {
        addressType: 'Work',
        city: 'Banglore',
        state: 'Karnataka'
      };

      const res = await request(app)
        .post('/api/v1/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(addressData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('GET /api/v1/address', () => {
    it('should return adress ', async () => {
      const res = await request(app)
        .get('/api/v1/address')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.be.an('object');
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).get('/api/v1/address');

      expect(res.statusCode).to.be.equal(401);
    });
  });

  describe('PUT /api/v1/address', () => {
    it('should update an address successfully', async () => {
      const updateData = {
        addressType: 'Work',
        addressLine1: '456 Updated St',
        addressLine2: 'Apt 5678',
        city: 'Updatedville',
        state: 'Updated State',
        postalCode: '67890',
        country: 'Updated Country'
      };

      const res = await request(app)
        .put(`/api/v1/address`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 404 for non-existent address', async () => {
      const updateData = {
        addressType: 'Home',
        addressLine1: '456 Updated St',
        addressLine2: 'Apt 5678',
        city: 'Updatedville',
        state: 'Updated State',
        postalCode: '67890',
        country: 'Updated Country'
      };

      const res = await request(app)
        .put('/api/v1/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('DELETE /api/v1/address', () => {
    it('should delete an address successfully', async () => {
      const res = await request(app)
        .delete(`/api/v1/address`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });
    it('should create a new address successfully', async () => {
      const addressData = {
        addressType: 'Work',
        addressLine1: 'Bridgelabz Hsr layout',
        addressLine2: 'Apt 1034',
        city: 'Banglore',
        state: 'Karnataka',
        postalCode: '560021',
        country: 'India'
      };

      const res = await request(app)
        .post('/api/v1/address')
        .set('Authorization', `Bearer ${authToken}`)
        .send(addressData);

      expect(res.statusCode).to.be.equal(201);
    });

  
  });
});
