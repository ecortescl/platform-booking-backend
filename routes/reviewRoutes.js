// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Ruta para obtener todas las reseñas
router.get('/', ReviewController.getReviews);

// Ruta para crear una nueva reseña
router.post('/', ReviewController.createReview);

// Ruta para obtener una reseña por su ID
router.get('/:id', ReviewController.getReviewById);

// Ruta para actualizar una reseña por su ID
router.put('/:id', ReviewController.updateReview);

// Ruta para eliminar una reseña por su ID
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
