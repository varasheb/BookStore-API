import rateLimit from 'express-rate-limit';
import HttpStatus from 'http-status-codes';


export const forgetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many password reset attempts from this IP, please try again after 15 minutes',
  headers: true, 
  handler: (req, res, next, options) => {
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      code :HttpStatus.TOO_MANY_REQUESTS,
      message: options.message
    });
  }
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
  headers: true, 
  handler: (req, res, next, options) => {
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      code :HttpStatus.TOO_MANY_REQUESTS,
      message: options.message
    });
  }
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many registration attempts from this IP, please try again after an hour',
  headers: true, 
  handler: (req, res, next, options) => {
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      code :HttpStatus.TOO_MANY_REQUESTS,
      message: options.message
    });
  }
});

export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: 'Too many search requests from this IP, please try again after a minute',
  headers: true, 
  handler: (req, res, next, options) => {
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      code :HttpStatus.TOO_MANY_REQUESTS,
      message: options.message
    });
  }
});