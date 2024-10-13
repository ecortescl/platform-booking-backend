// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

// Ruta para obtener todas las citas
router.get('/appointments', AppointmentController.getAppointments);

// Ruta para crear una nueva cita
router.post('/appointments', AppointmentController.createAppointment);

// Ruta para obtener una cita por su ID
router.get('/appointments/:id', AppointmentController.getAppointmentById);

// Ruta para actualizar una cita por ID
router.put('/appointments/:id', AppointmentController.updateAppointment);

// Ruta para eliminar una cita por ID
router.delete('/appointments/:id', AppointmentController.deleteAppointment);

module.exports = router;
