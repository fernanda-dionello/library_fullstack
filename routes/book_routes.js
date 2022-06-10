const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller');

router.get('/available', book_controller.listAvailableBooks);
router.get('/', book_controller.listBooks);
router.get('/:id', book_controller.listBookById);
router.get('/author/:id', book_controller.listBookByAuthorId);
router.post('/', book_controller.createBooks);
router.put('/:id', book_controller.updateBook);
router.delete('/:id', book_controller.removeBook);

module.exports = router;