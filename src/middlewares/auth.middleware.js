import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.JWT_SECRET;
const resetkey = process.env.JWT_RESET_SECRET;

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new Error('Authentication required');
    }
    bearerToken = bearerToken.split(' ')[1];
    const { id } = await jwt.verify(bearerToken, key);
    req.body.userId = id;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
};

/**
 * Middleware to authenticate if user has a valid Authorization token
 * for reset password
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userResetAuth = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new Error('Authentication required');
    }
    bearerToken = bearerToken.split(' ')[1];
    const { id } = await jwt.verify(bearerToken, resetkey);
    req.body.userId = id;
    req.body.token = bearerToken;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
};
