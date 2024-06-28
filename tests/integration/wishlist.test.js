import { expect } from 'chai';
import request from 'supertest';
import {
  User,
  Book,
  Wishlist,
  Cart,
  Order,
  Address
} from '../../src/models/assocation';
import app from '../../src/index';

let authToken;
let bookId;

describe('Wishlist APIs Test', () => {
  before(async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'Test@1234'
    };

    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password });

    authToken = loginRes.body.token;

    const bookRes = await request(app).get('/api/v1/books');

    bookId = bookRes.body.data[0].id;
  });

  after(async () => {
    await Wishlist.destroy({ where: {} });
    await Order.destroy({ where: {} });
    await Cart.destroy({ where: {} });
    await Address.destroy({ where: {} });
    await Book.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe('POST /api/v1/wishlist/:id', () => {
    it('should add a book to the wishlist successfully', async () => {
      const res = await request(app)
        .post(`/api/v1/wishlist/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).to.have.property('id');
    });

    it('should return 400 for non-existent book', async () => {
      const res = await request(app)
        .post('/api/v1/wishlist/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('GET /api/v1/wishlist', () => {
    it('should get the wishlist', async () => {
      const res = await request(app)
        .get('/api/v1/wishlist')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).get('/api/v1/wishlist');

      expect(res.statusCode).to.be.equal(401);
    });
  });

  describe('DELETE /api/v1/wishlist/:id', () => {
    it('should remove a book from the wishlist successfully', async () => {
      const res = await request(app)
        .delete(`/api/v1/wishlist/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 400 for non-existent book in wishlist', async () => {
      const res = await request(app)
        .delete('/api/v1/wishlist/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });
});
