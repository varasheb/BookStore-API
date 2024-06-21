import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

/**
 * Controller to add to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToWishlist = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId;
    const data = await wishlistService.addTowishlist(bookId, userId);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Book added To wishlist successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to Get a wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await wishlistService.getWishlist(userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Retrived Book from wishlist successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to remove a wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeWishlist = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId;
    const data = await wishlistService.removeItemFromwishlist(bookId, userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book removed from wishlist successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
