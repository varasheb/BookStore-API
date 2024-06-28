import { expect } from 'chai';
import request from 'supertest';
import { User, Book, Cart} from '../../src/models/assocation';
import app from '../../src/index';


let authToken;
let bookId;

describe('Cart APIs Test', () => {
  before(async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'Test@1234'
    };
    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password });

    authToken = loginRes.body.token;

    const bookData = {
      description: 'A great book',
      discountPrice: 450.00,
      bookImage: 'http://example.com/image.jpg',
      bookName: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      quantity: 100,
      price: 999.00
    };

    const bookRes = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${authToken}`)
      .send(bookData);

    bookId = bookRes.body.data.id;
  });

  after(async () => {
    await User.destroy({ where: {} });
    await Book.destroy({ where: {} });
    await Cart.destroy({ where: {} });
  });

  describe('POST /api/v1/cart/:id', () => {
    it('should add a book to the cart successfully', async () => {
      const res = await request(app)
        .post(`/api/v1/cart/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).to.have.property('id');
      expect(res.body.data.books[0]).to.have.property('bookId', bookId);
      expect(res.body.data.books[0]).to.have.property('bookName', 'Thinking, Fast and Slow');
      expect(res.body.data.books[0]).to.have.property('author', 'Daniel Kahneman');
      expect(res.body.data.books[0]).to.have.property('price', '999.00');
      expect(res.body.data.books[0]).to.have.property('discountPrice', '450.00');
      expect(res.body).to.have.property('message', 'Book added To Cart successfully');
    });

    it('should return 400 for non-existent book', async () => {
      const res = await request(app)
        .post('/api/v1/cart/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('GET /api/v1/cart', () => {
    it('should get all items from the cart', async () => {
      const res = await request(app)
        .get('/api/v1/cart')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data.books).to.be.an('array');
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app)
        .get('/api/v1/cart');

      expect(res.statusCode).to.be.equal(401);
    });
  });

  describe('DELETE /api/v1/cart/:id', () => {
    it('should remove an item from the cart successfully', async () => {
      const res = await request(app)
        .delete(`/api/v1/cart/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 400 for non-existent item in cart', async () => {
      const res = await request(app)
        .delete('/api/v1/cart/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });
});
