import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';



const router = express.Router();

router.get('', userAuth, cartController.getAllItemCart);

router.post('/:id', userAuth, cartController.addToCart);

router.delete('/:id', userAuth, cartController.removeItemCart);


export default router;