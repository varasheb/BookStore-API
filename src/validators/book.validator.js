import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const bookValidator = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string().min(3).required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().min(0).required(),
    discountPrice: Joi.number().min(0),
    bookImage: Joi.string().uri().required()
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
