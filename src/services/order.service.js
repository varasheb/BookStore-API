import { publish } from '../config/rabbitMq';

const { Order, Address, Cart, Book, User } = require('../models/assocation');

// create new order
export const newOrder = async (userId, addressId) => {
  const address = await Address.findOne({ where: { id: addressId, userId } });
  if (!address)
    throw new Error('Address not found or does not belong to the user');

  const cart = await Cart.findOne({ where: { userId } });
  if (!cart || cart.books.length === 0) throw new Error('Cart not found');

  for (const cartItem of cart.books) {
    const book = await Book.findByPk(cartItem.bookId);
    if (!book) throw new Error(`Book with id ${cartItem.bookId} not found`);
    if (book.quantity < cartItem.quantity)
      throw new Error(`Out of Stock for book id ${cartItem.bookId}`);
    book.quantity -= cartItem.quantity;
    await book.save();
  }

  const { fullName, mobile } = address;
  const order = await Order.create({
    userId,
    addressId,
    books: cart.books,
    fullName,
    mobile,
    totalAmount: cart.totalDiscountPrice
  });
  cart.books = [];
  cart.totalDiscountPrice = 0;
  cart.totalPrice = 0;
  await cart.save();
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  const message = JSON.stringify({
    order: order,
    email: user.email
  });
  await publish('Order', message);
  return order;
};

// get all order
export const getOrder = async (userId) => {
  const orders = await Order.findAll({ where: { userId } });
  return orders;
};

// Remove order
export const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ where: { id: orderId, userId } });
  if (!order) {
    throw new Error(
      'Order not found or you are not authorized to cancel this order'
    );
  }
  order.status = 'Cancelled';
  await order.save();
  return order;
};

// Update order
export const updateOrder = async (orderId, userId, updateBody) => {
  const order = await Order.findOne({ where: { id: orderId, userId } });
  if (!order) {
    throw new Error(
      'Order not found or you are not authorized to update this order'
    );
  }
  if (updateBody.status) {
    order.status = updateBody.status;
  }
  if (updateBody.paymentStatus) {
    order.paymentStatus = updateBody.paymentStatus;
  }
  await order.save();
  return order;
};
