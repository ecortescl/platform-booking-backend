// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para obtener todos los usuarios
router.get('/users', UserController.getUsers);

// Ruta para crear un nuevo usuario
router.post('/users', UserController.createUser);

// Ruta para obtener un usuario por su ID
router.get('/users/:id', UserController.getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/users/:id', UserController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
