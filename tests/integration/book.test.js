import { expect } from 'chai';
import request from 'supertest';
import { User, Book, Address} from '../../src/models/assocation';
import app from '../../src/index';

let authToken;
let bookId;

describe('Book APIs Test', () => {
  before(async () => {

    const userData = {
      email: 'testuser@example.com',
      password: 'Test@1234'
    };
    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password });

    authToken = loginRes.body.token;
  });

  // after(async () => {
  //   await Address.destroy({ where: {} });
  //   await Book.destroy({ where: {} });
  //   await User.destroy({ where: {} });
  // });

  describe('POST /api/v1/books', () => {
    it('should add a new book successfully', async () => {
      const bookData = {
        description: 'A great book',
        discountPrice: 19.99,
        bookImage: 'http://example.com/image.jpg',
        bookName: 'Book Title',
        author: 'Author Name',
        quantity: 100,
        price: 29.99
      };

      const res = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${authToken}`)
        .send(bookData);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).to.have.property('id');
      bookId = res.body.data.id;
    });

    it('should return validation error for missing fields', async () => {
      const bookData = {
        description: 'A great book',
        discountPrice: 19.99,
        bookImage: 'http://example.com/image.jpg',
        bookName: 'Book Title',
        author: 'Author Name'
      };

      const res = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${authToken}`)
        .send(bookData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('GET /api/v1/books', () => {
    it('should get all books', async () => {
      const res = await request(app)
        .get('/api/v1/books')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.be.an('array');
    });
  });

  describe('GET /api/v1/books/:id', () => {
    it('should get a book by ID successfully', async () => {
      const res = await request(app)
        .get(`/api/v1/books/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.have.property('id', bookId);
    });

    it('should return 400 for non-existent book', async () => {
      const res = await request(app)
        .get('/api/v1/books/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('PUT /api/v1/books/:id', () => {
    it('should update a book by ID successfully', async () => {
      const updateData = {
        description: 'An updated great book',
        discountPrice: 14.99,
        bookImage: 'http://example.com/newimage.jpg',
        bookName: 'Updated Book Title',
        author: 'Updated Author Name',
        quantity: 50,
        price: 24.99
      };

      const res = await request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(200);
      expect(res.body.data).to.have.property('description', updateData.description);
    });

    it('should return 400 for non-existent book', async () => {
      const updateData = {
        description: 'An updated great book',
        discountPrice: 14.99,
        bookImage: 'http://example.com/newimage.jpg',
        bookName: 'Updated Book Title',
        author: 'Updated Author Name',
        quantity: 50,
        price: 24.99
      };

      const res = await request(app)
        .put('/api/v1/books/9999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.statusCode).to.be.equal(400);
    });
  });

  describe('DELETE /api/v1/books/:id', () => {
    it('should delete a book by ID successfully', async () => {
      const res = await request(app)
        .delete(`/api/v1/books/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(200);
    });

    it('should return 400 for non-existent book', async () => {
      const res = await request(app)
        .delete('/api/v1/books/9999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).to.be.equal(400);
    });
  });
});
