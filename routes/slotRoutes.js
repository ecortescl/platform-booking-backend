// routes/slotRoutes.js

const express = require('express');
const router = express.Router();
const SlotController = require('../controllers/SlotController');

// Ruta para obtener todos los slots
router.get('/slots', SlotController.getSlots);

// Ruta para crear un nuevo slot
router.post('/slots', SlotController.createSlot);

// Ruta para obtener un slot por su ID
router.get('/slots/:id', SlotController.getSlotById);

// Ruta para actualizar un slot por su ID
router.put('/slots/:id', SlotController.updateSlot);

// Ruta para eliminar un slot por su ID
router.delete('/slots/:id', SlotController.deleteSlot);

module.exports = router;
