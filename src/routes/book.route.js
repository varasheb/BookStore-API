import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { bookValidator } from '../validators/book.validator';


const router = express.Router();

router.post('', bookValidator, userAuth, bookController.addBook);

router.get('', userAuth, bookController.getAllBooks);

router.get('/:id', userAuth, bookController.getBook);

router.put('/:id', userAuth, bookController.updateBook);

router.delete('/:id', userAuth, bookController.deleteBook);


export default router;