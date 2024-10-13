// routes/calendarRoutes.js

const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/CalendarController');

// Ruta para obtener todos los calendarios
router.get('/calendars', CalendarController.getCalendars);

// Ruta para crear un nuevo calendario
router.post('/calendars', CalendarController.createCalendar);

// Ruta para obtener un calendario por su ID
router.get('/calendars/:id', CalendarController.getCalendarById);

// Ruta para actualizar un calendario por ID
router.put('/calendars/:id', CalendarController.updateCalendar);

// Ruta para eliminar un calendario por ID
router.delete('/calendars/:id', CalendarController.deleteCalendar);

module.exports = router;