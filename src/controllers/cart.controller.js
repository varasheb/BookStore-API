import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

/**
 * Controller to add to Cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToCart = async (req, res) => {
  try {
    const bookId=req.params.id;
    const userId=req.body.userId;
    const data = await CartService.addToCart(bookId,userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Book added To Cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};


/**
 * Controller to Get all items in cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllItemCart = async (req, res) => {
    try {
      const userId=req.body.userId;
      const data = await CartService.getAllItemCart(userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Retrived Book from cart successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };



/**
 * Controller to remove item to Cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeItemCart = async (req, res) => {
    try {
      const bookId=req.params.id;
      const userId=req.body.userId;
      const data = await CartService.removeItemCart(bookId,userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book removed from Cart successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };
  
  