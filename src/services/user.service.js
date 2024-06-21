import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendResetPasswordEmail } from '../utils/sendMail';

const {User} = require('../models/assocation');


dotenv.config();

const key = process.env.JWT_SECRET;
const resetkey = process.env.JWT_RESET_SECRET;

//create new user
export const registerUser = async (body) => {
  const user = await User.findOne({
    where: { email: body.email, mobile: body.mobile }
  });
  if (user)
    throw new Error('User Already Exist for this Email or mobile Number');
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  const data = await User.create(body);
  return data;
};

// login the user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id }, key);
  return { user, token };
};

// forgot password
export const forgetPassword = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('This email does not exist');

  const token = jwt.sign({ id: user.id }, resetkey, { expiresIn: '10m' });
  const result = await sendResetPasswordEmail(user.email, token);
  return { user, token, result };
};

// reset password
export const resetPassword = async (userId, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};
