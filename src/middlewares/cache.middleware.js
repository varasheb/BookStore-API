import redis from 'ioredis';
import HttpStatus from 'http-status-codes';

const { Book } = require('../models/assocation');
const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

export const cacheAllBooks = async () => {
  const books = await Book.findAll();
  await redisClient.set('books', JSON.stringify(books), 'EX', 3600);
};

export const getAllCachedBooks = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    redisClient.get('books', (err, data) => {
      if (data === null) {
        next();
        return;
      }
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : null);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: JSON.parse(data),
        message: 'fetched Books sucefully'
      });
    });
  });
};

export const getBookFromCache = async (req, res, next) => {
  const { id } = req.params;
  const cachedBooks = await redisClient.get('books');
  if (cachedBooks) {
    const booksArray = JSON.parse(cachedBooks);
    const book = booksArray.find((book) => book.id === parseInt(id));

    if (book) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: book,
        message: 'Fetched cached book successfully'
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

export const invalidateBooksCache = async () => {
  await redisClient.del('books');
};
