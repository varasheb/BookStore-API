import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/cart', cartRoute);

  return router;
};

export default routes;
