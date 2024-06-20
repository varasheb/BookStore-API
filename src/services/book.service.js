import sequelize, { DataTypes } from '../config/database';

const Book = require('../models/book')(sequelize, DataTypes);



//create new Book
export const addBook = async (body) => {
  const data = await Book.create(body);
  return data;
};
