// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

// Ruta para obtener todos los servicios
router.get('/services', ServiceController.getServices);

// Ruta para crear un nuevo servicio
router.post('/services', ServiceController.createService);

// Ruta para obtener un servicio por su ID
router.get('/services/:id', ServiceController.getServiceById);

// Ruta para actualizar un servicio por su ID
router.put('/services/:id', ServiceController.updateService);

// Ruta para eliminar un servicio por su ID
router.delete('/services/:id', ServiceController.deleteService);

module.exports = router;
