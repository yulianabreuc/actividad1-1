const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerBooks.js');

router.get('/', Controller.getBooks);
router.post('/', Controller.createBook);
router.put('/:id', Controller.updateBook);
router.delete('/:id', Controller.deleteBook);
router.get('/:id', Controller.getBook);


module.exports = router;