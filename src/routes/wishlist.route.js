import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, wishlistController.getWishlist);

router.post('/:id', userAuth, wishlistController.addToWishlist);

router.delete('/:id', userAuth, wishlistController.removeWishlist);

export default router;
