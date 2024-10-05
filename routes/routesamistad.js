const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerAmistad.js');

router.get('/', Controller.getSolicitudesAmistad);
router.post('/', Controller.createSolicitudAmistad);
router.put('/:id', Controller.updateSolicitudAmistad);

module.exports = router;