// routes/servicesUserRoutes.js

const express = require('express');
const router = express.Router();
const ServicesUserController = require('../controllers/ServiceuserController');

// Ruta para obtener todos los servicios de usuarios
router.get('/', ServicesUserController.getServicesUsers);

// Ruta para crear un nuevo servicio para un usuario
router.post('/', ServicesUserController.createServicesUser);

// Ruta para obtener un servicio de usuario por su ID
router.get('/:id', ServicesUserController.getServicesUserById);

// Ruta para actualizar un servicio de usuario por su ID
router.put('/:id', ServicesUserController.updateServicesUser);

// Ruta para eliminar un servicio de usuario por su ID
router.delete('/:id', ServicesUserController.deleteServicesUser);

module.exports = router;
