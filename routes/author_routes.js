const express = require('express');
const router = express.Router();
const author_controller = require('../controllers/author_controller');

router.get('/', author_controller.listAuthors);
router.get('/:id', author_controller.listAuthorById);
router.post('/', author_controller.createAuthors);
router.put('/:id', author_controller.updateAuthor);
router.delete('/:id', author_controller.removeAuthor);

module.exports = router;


