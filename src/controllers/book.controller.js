import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBook = async (req, res) => {
  try {
    const data = await BookService.addBook(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Book added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to retrive a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = await BookService.getBook(bookId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book retrieved successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to retrive all the Books
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBooks = async (req, res) => {
  try {
    const data = await BookService.getAllBooks();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Books retrieved successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to update a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = await BookService.updateBook(bookId, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to Delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { adminUserId } = req.body;
    const data = await BookService.deleteBook(bookId, adminUserId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book Deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
