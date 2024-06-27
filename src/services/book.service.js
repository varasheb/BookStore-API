import {
  cacheAllBooks,
  invalidateBooksCache
} from '../middlewares/cache.middleware';
const { User, Book } = require('../models/assocation');

//create new Book
export const addBook = async (body) => {
  const user = await User.findByPk(body.userId);
  if (!user) throw new Error('User not found');
  if (user.role !== 'admin') {
    throw new Error('Only admin users can add books');
  }
  const data = await Book.create(body);
  await invalidateBooksCache();
  return data;
};

//Fetch a Book by Id
export const getBook = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  await cacheAllBooks();
  return book;
};

//Fetch all Book
export const getAllBooks = async () => {
  const books = await Book.findAll();
  await cacheAllBooks();
  return books;
};

// Update Book By Id
export const updateBook = async (bookId, body) => {
  const user = await User.findByPk(body.userId);
  if (!user) throw new Error('User not found');

  if (user.role !== 'admin')
    throw new Error('Only admin users can update books');

  const updatedBook = await Book.update(body, {
    where: { id: bookId },
    returning: true
  });
  if (updatedBook[0] === 0) throw new Error('Book not found');
  await invalidateBooksCache();
  return updatedBook[1][0];
};

// Delete the Book
export const deleteBook = async (bookId, userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  if (user.role !== 'admin')
    throw new Error('Unauthorized: Only admin users can delete books');

  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Book not found');
  await book.destroy();
  await invalidateBooksCache();
  return book;
};
