const { Cart, Book } = require('../models/assocation');

//create new cart
export const addToCart = async (bookId, userId) => {
  const book = await Book.findOne({ where: { id: bookId } });
  if (!book)  throw new Error('Book not found');

  let cart = await Cart.findOne({ where: { userId } });

  if (!cart) {
    cart = await Cart.create({
      userId,
      books: [{
        bookId: book.id,
        quantity: 1,
        bookName: book.bookName,
        author: book.author,
        price:book.price, 
        discountPrice:book.discountPrice
      }],
      totalPrice:book.price, 
      totalDiscountPrice:book.discountPrice, 
      isOrderPlaced: false
    });
  } else {
    const existingBook = cart.books.find((item) => parseInt(item.bookId) === book.id);
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.books.push({
        bookId: book.id,
        quantity: 1,
        bookName: book.bookName,
        author: book.author,
        price:book.price, 
        discountPrice:book.discountPrice
      });
    }
    cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(book.price);
    cart.totalDiscountPrice = parseFloat(cart.totalDiscountPrice) + parseFloat(book.discountPrice);
    cart.changed('books', true);
  }
  await cart.save();
  return cart;
};


// get all items from cart
export const getAllItemFromCart = async (userId) => {
  const cart = await Cart.findOne({
    where: { userId: userId }
  });

  if (!cart || cart.books.length === 0) 
    throw new Error('No items found in the cart for this user');
  
  return cart;
};

// Remove items from cart
export const removeItemFromCart = async (bookId, userId) => {
  const cart = await Cart.findOne({ where: { userId } });
  if (!cart) throw new Error('Cart not found');

  const existingBook = cart.books.find((item) => item.bookId == bookId);
  if (!existingBook) throw new Error('Book is not present in the cart');
  if (existingBook.quantity > 1) {
    existingBook.quantity -= 1;
  } else {
    cart.books = cart.books.filter((item) => item.bookId != bookId);
  }
  cart.totalPrice = parseFloat(cart.totalPrice) - parseFloat(existingBook.price);
  cart.totalDiscountPrice = parseFloat(cart.totalDiscountPrice) - parseFloat(existingBook.discountPrice);
  cart.changed('books', true);
  
  await cart.save();
  return cart;
};
