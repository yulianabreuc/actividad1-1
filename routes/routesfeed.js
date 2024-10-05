const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerFeed.js');

router.post('/', Controller.getFeed);

module.exports = router;