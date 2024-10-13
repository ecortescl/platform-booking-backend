// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Ruta para obtener todas las reseñas
router.get('/reviews', ReviewController.getReviews);

// Ruta para crear una nueva reseña
router.post('/reviews', ReviewController.createReview);

// Ruta para obtener una reseña por su ID
router.get('/reviews/:id', ReviewController.getReviewById);

// Ruta para actualizar una reseña por su ID
router.put('/reviews/:id', ReviewController.updateReview);

// Ruta para eliminar una reseña por su ID
router.delete('/reviews/:id', ReviewController.deleteReview);

module.exports = router;