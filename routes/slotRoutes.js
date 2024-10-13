// routes/slotRoutes.js

const express = require('express');
const router = express.Router();
const SlotController = require('../controllers/SlotController');

// Ruta para obtener todos los slots
router.get('/', SlotController.getSlots);

// Ruta para crear un nuevo slot
router.post('/', SlotController.createSlot);

// Ruta para obtener un slot por su ID
router.get('/:id', SlotController.getSlotById);

// Ruta para actualizar un slot por su ID
router.put('/:id', SlotController.updateSlot);

// Ruta para eliminar un slot por su ID
router.delete('/:id', SlotController.deleteSlot);

module.exports = router;
