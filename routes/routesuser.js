const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerUsers.js');

router.get('/', Controller.getUsers);
router.post('/', Controller.createUser);
router.put('/:id', Controller.updateUser);
router.delete('/:id', Controller.deleteUser);
router.get('/:id', Controller.getUser);

module.exports = router;
