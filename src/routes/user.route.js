import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  newUserValidator,
  loginValidator,
  emailValidator,
  passwordValidator
} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { userResetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('', newUserValidator, userController.registerUser);

router.post('/login', loginValidator, userController.loginUser);

router.post('/forgotpassword', emailValidator, userController.forgetPassword);

router.post(
  '/resetpassword',
  passwordValidator,
  userResetAuth,
  userController.resetPassword
);

export default router;
