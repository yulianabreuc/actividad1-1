const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerRent.js');

router.get('/', Controller.getRents);
router.post('/', Controller.createRent);
router.put('/:id', Controller.updateRent);
router.get('/:id', Controller.getRentById);

module.exports = router;