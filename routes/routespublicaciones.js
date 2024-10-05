const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerPublicaciones.js');

router.get('/', Controller.getPublicaciones);
router.post('/', Controller.createPublicacion);
router.post('/comment', Controller.createComentarioPubli);
router.put('/:id', Controller.updateBook);
router.delete('/:id', Controller.deleteBook);
router.get('/:id', Controller.getBook);


module.exports = router;