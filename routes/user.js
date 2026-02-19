const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUsuario);
router.put('/:id', userController.verifyToken, userController.actualizarUsuario);
router.post('/email', userController.getEmail);
router.post('/register', userController.crearUsuario);
router.post('/login', userController.loginUsuario);

module.exports = router;