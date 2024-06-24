import express from 'express';
import * as addressController from '../controllers/address.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, addressController.getAddress);

router.post('', userAuth, addressController.newAddress);

router.delete('/:id', userAuth, addressController.removeAddress);

export default router;
