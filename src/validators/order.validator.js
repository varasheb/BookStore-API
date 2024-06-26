import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const orderValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).required(),
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .message('Mobile number must be a 10-digit numeric string')
      .required(),
    addressId: Joi.number().integer().positive().required(),
    cartId: Joi.number().integer().positive().required()
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
