import express from 'express';
import * as orderController from '../controllers/order.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

router.get('', userAuth, orderController.getOrder);

router.post('/:id', userAuth, orderController.newOrder);

router.put('/:id', userAuth, orderController.updateOrder);

router.delete('/:id', userAuth, orderController.cancelOrder);

export default router;
