import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import orderRoute from './order.route';
import addressRoute from './address.route';


/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/cart', cartRoute);

  router.use('/wishlist', wishlistRoute);

  router.use('/order', orderRoute);

  router.use('/address', addressRoute);

  return router;
};

export default routes;
