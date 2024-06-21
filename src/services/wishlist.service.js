import sequelize, { DataTypes } from '../config/database';
import { removeWishlist } from '../controllers/wishlist.controller';

const Wishlist = require('../models/wishlist')(sequelize, DataTypes);
const Book = require('../models/book')(sequelize, DataTypes);

//create new wishlist
export const addToWishlist = async (bookId, userId) => {

      const book = await Book.findOne({ where: { id: bookId } });
      if (!book) {
        throw new Error('Book not found');
      }
      const existingWishlistItem = await Wishlist.findOne({
        where: { bookId, userId }
      });
      if (existingWishlistItem) 
         throw new Error('Book is already in the wishlist');

      const newWishlistItem = await Wishlist.create({ bookId, userId });
      return newWishlistItem;
    }

// get all items from wishlist
export const getWishlist = async (userId) => {

};

// Remove items from wishlist
export const removeWishlist = async (bookId, userId) => {
 
};
