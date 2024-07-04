import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { bookValidator } from '../validators/book.validator';
import {
  getAllCachedBooks,
  getBookFromCache
} from '../middlewares/cache.middleware';
import { searchLimiter } from '../middlewares/rateLimiter.middleware';

const router = express.Router();

router.post('', bookValidator, userAuth, bookController.addBook);

router.get('', searchLimiter, getAllCachedBooks, bookController.getAllBooks);

router.get('/:id', searchLimiter, getBookFromCache, bookController.getBook);

router.put('/:id', userAuth, bookController.updateBook);

router.delete('/:id', userAuth, bookController.deleteBook);

export default router;
