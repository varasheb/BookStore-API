import express from 'express';
import * as addressController from '../controllers/address.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { addressValidator } from '../validators/address.validator';

const router = express.Router();

router.get('', userAuth, addressController.getAddress);

router.post('', userAuth, addressValidator, addressController.newAddress);

router.put('', userAuth, addressController.updateAddress);

router.delete('', userAuth, addressController.removeAddress);

export default router;
