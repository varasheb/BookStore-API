import sequelize, { DataTypes } from '../config/database';

const Book = require('../models/book')(sequelize, DataTypes);



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