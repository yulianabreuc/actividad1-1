const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerRent.js');

router.get('/', Controller.getRents);
router.post('/', Controller.createRent);

module.exports = router;