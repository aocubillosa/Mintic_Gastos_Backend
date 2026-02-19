const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const userController = require('../controllers/userController');

router.post('/', userController.verifyToken, gastoController.crearGasto);
router.get('/', userController.verifyToken, gastoController.obtenerGastos);
router.put('/:id', userController.verifyToken, gastoController.actualizarGasto);
router.get('/:id', userController.verifyToken, gastoController.obtenerGasto);
router.delete('/:id', userController.verifyToken, gastoController.eliminarGasto);

module.exports = router;