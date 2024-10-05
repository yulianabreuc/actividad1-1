const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerAmistad.js');

router.post('/', Controller.createSolicitudAmistad);

module.exports = router;