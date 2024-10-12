const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Rutas para la gestión de signos
router
    .get('/', signoController.getAllSignos)             // Obtener todos los signos
    .get('/:signo', signoController.getOneSigno)        // Obtener un signo específico
    .patch('/:signoEditar', signoController.updateSigno) // Actualizar un signo específico

// Rutas para gestión de usuario
router
    .post('/login', signoController.calculeLogin)        // Login de usuario
    .post('/register', signoController.register)         // Registro de usuario
    .post('/reset-password', signoController.resetPassword); // Restablecer contraseña de usuario

module.exports = router;
