const {Book} = require('../models/assocation');


//create new Book
export const addBook = async (body) => {
  const data = await Book.create(body);
  return data;
};

//Fetch a Book by Id
export const getBook = async (bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
};

//Fetch all Book
export const getAllBooks = async () => {
  const books = await Book.findAll();
  return books;
};

// Update Book By Id
export const updateBook = async (bookId, body) => {
  const updatedBook = await Book.update(body, {
    where: { id: bookId },
    returning: true
  });
  if (updatedBook[0] === 0) throw new Error('Book not found');
  return updatedBook[1][0];
};

// Delete the Book
export const deleteBook = async (bookId, adminUserId) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.adminUserId !== adminUserId) {
    throw new Error('Unauthorized: Only the admin Can Delete');
  }

  await book.destroy();
  return book;
};
