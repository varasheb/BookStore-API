import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const addressValidator = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    addressType: Joi.string().valid('Home', 'Work', 'Other').required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required()
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
