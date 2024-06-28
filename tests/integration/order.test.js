import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let authToken;
let addressId;
let orderId;

describe('Order APIs Test', () => {
  before(async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'Test@1234'
    };

    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password });

    authToken = loginRes.body.token;

    const addressRes = await request(app)
      .get('/api/v1/address')
      .set('Authorization', `Bearer ${authToken}`);
    addressId = addressRes.body.data.id;
  });

  describe('POST /api/v1/order/:id', () => {
    it('should place an order successfully', async () => {
      const res = await request(app)
        .post(`/api/v1/order/${addressId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(201);
      orderId = res.body.data.id;
    });

    it('should return 404 for non-existent address or book', async () => {
      const invalidOrderData = {
        addressId: 9999,
        books: [
          {
            bookId: 9999,
            quantity: 1
          }
        ],
        fullName: 'Test User',
        mobile: '9999999999',
        totalAmount: '100.00'
      };

      const res = await request(app)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidOrderData);

      expect(res.statusCode).to.be.equal(404);
    });
  });

  describe('GET /api/v1/order', () => {
    it('should get all orders', async () => {
      const res = await request(app)
        .get('/api/v1/order')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.be.an('array');
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).get('/api/v1/order');

      expect(res.statusCode).to.be.equal(401);
    });
  });

  describe('PUT /api/v1/order/:id', () => {
    it('should update an order successfully', async () => {
      const updateData = {
        status: 'Shipped',
        paymentStatus: 'Completed'
      };

      const res = await request(app)
        .put(`/api/v1/order/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.have.property('status', 'Shipped');
      expect(res.body.data).to.have.property('paymentStatus', 'Completed');
    });

    it('should return 400 for non-existent order', async () => {
      const updateData = {
        status: 'Shipped',
        paymentStatus: 'Paid'
      };

      const res = await request(app)
        .put('/api/v1/order/9999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('DELETE /api/v1/order/:id', () => {
    it('should cancel an order successfully', async () => {
      const res = await request(app)
        .delete(`/api/v1/order/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 400 for non-existent order', async () => {
      const res = await request(app)
        .delete('/api/v1/order/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });
});
