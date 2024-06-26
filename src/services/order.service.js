const { Order, Address, Cart, Book } = require('../models/assocation');

// create new order
export const newOrder = async ({
  userId,
  addressId,
  cartId,
  fullName,
  mobile
}) => {
  const address = await Address.findOne({
    where: { id: addressId, userId: userId }
  });
  if (!address)
    throw new Error('Address not found or does not belong to the user');

  const cart = await Cart.findOne({ where: { id: cartId, userId } });
  if (!cart) throw new Error('Cart not found');

  const book = await Book.findByPk(cart.bookId);
  if (!book) throw new Error(`Book with id ${cart.bookId} not found`);
  if (book.quantity < cart.quantity)
    throw new Error(`Out of Stock for book id ${cart.bookId}`);
  book.quantity -= cart.quantity;
  await book.save();

  const order = await Order.create({
    userId,
    addressId,
    cartId,
    fullName,
    mobile,
    totalAmount: cart.totalPrice
  });
  cart.isOrderPlaced = true;
  await cart.save();
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
