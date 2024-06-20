import sequelize, { DataTypes } from '../config/database';

const Cart = require('../models/cart')(sequelize, DataTypes);
const Book = require('../models/book')(sequelize, DataTypes);



//create new cart
export const addToCart = async (bookId, userId) => {
 let cartItem = await Cart.findOne({
   where: {
     bookId: bookId,
     userId: userId
   }
 });
 const book = await Book.findOne({ where: { id: bookId } });
 if (cartItem) {
   cartItem.quantity += 1;
   cartItem.totalPrice = cartItem.quantity * book.price;
   await cartItem.save();
 } else {
   cartItem = await Cart.create({
       userId: userId,
       bookId: bookId,
       quantity: 1,
       bookName: book.bookName, 
       author: book.author, 
       price: book.price,
       totalPrice: book.price
     });
   }
 return cartItem;
}

// get all items from cart
export const getAllItemCart = async (userId) => {
  const cartItems = await Cart.findAll({
    where: { userId: userId }
  });

  if (!cartItems || cartItems.length === 0) {
    throw new Error('No items found in the cart for this user');
  }

  return cartItems;
}

// Remove items from cart
export const removeItemCart = async (bookId, userId) => {
   const cartItem = await Cart.findOne({
     where: {
       bookId: bookId,
       userId: userId
     }
   });

   if (!cartItem) {
     throw new Error('Item not found in cart');
   }
   cartItem.quantity -= 1;
   cartItem.totalPrice = cartItem.quantity * cartItem.price;
   if (cartItem.quantity <= 0) {
     await cartItem.destroy();
     return { message: 'Item removed from cart' };
   } else {
     await cartItem.save();
     return cartItem;
   }
}