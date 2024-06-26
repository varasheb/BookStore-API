import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .message('Not a valid Phone No')
      .required(),
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
      .message(
        'Password must be 8+ chars with a digit, lower, upper, and special character.'
      )
      .required(),
      role: Joi.string().valid('admin', 'customer').optional() ,
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .message('Not a valid Phone No'),
    email: Joi.string().email().message('Not a valid Email'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
      .message(
        'Password must be 8+ chars with a digit, lower, upper, and special character.'
      )
      .required()
  }).or('mobile', 'email');

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const emailValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().message('Not a valid Email')
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const passwordValidator = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
      .message(
        'Password must be 8+ chars with a digit, lower, upper, and special character.'
      )
      .required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
