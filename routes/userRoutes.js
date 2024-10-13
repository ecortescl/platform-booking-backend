// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para obtener todos los usuarios
router.get('/', UserController.getUsers);

// Ruta para crear un nuevo usuario
router.post('/', UserController.createUser);

// Ruta para obtener un usuario por su ID
router.get('/:id', UserController.getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/:id', UserController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
