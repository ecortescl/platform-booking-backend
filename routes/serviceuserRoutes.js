// routes/servicesUserRoutes.js

const express = require('express');
const router = express.Router();
const ServicesUserController = require('../controllers/ServicesUserController');

// Ruta para obtener todos los servicios de usuarios
router.get('/services-users', ServicesUserController.getServicesUsers);

// Ruta para crear un nuevo servicio para un usuario
router.post('/services-users', ServicesUserController.createServicesUser);

// Ruta para obtener un servicio de usuario por su ID
router.get('/services-users/:id', ServicesUserController.getServicesUserById);

// Ruta para actualizar un servicio de usuario por su ID
router.put('/services-users/:id', ServicesUserController.updateServicesUser);

// Ruta para eliminar un servicio de usuario por su ID
router.delete('/services-users/:id', ServicesUserController.deleteServicesUser);

module.exports = router;
