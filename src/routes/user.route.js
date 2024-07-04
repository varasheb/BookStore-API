import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  newUserValidator,
  loginValidator,
  emailValidator,
  passwordValidator
} from '../validators/user.validator';
import { userResetAuth } from '../middlewares/auth.middleware';
import {forgetPasswordLimiter,registerLimiter,loginLimiter} from '../middlewares/rateLimiter.middleware';

const router = express.Router();

router.post('', registerLimiter, newUserValidator, userController.registerUser);

router.post('/login', loginLimiter, loginValidator, userController.loginUser);

router.post('/forgotpassword', forgetPasswordLimiter, emailValidator, userController.forgetPassword);

router.post(
  '/resetpassword',
  passwordValidator,
  userResetAuth,
  userController.resetPassword
);

export default router;
