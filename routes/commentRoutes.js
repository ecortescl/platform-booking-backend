// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Ruta para obtener todos los comentarios
router.get('/comments', CommentController.getComments);

// Ruta para crear un nuevo comentario
router.post('/comments', CommentController.createComment);

// Ruta para obtener un comentario por su ID
router.get('/comments/:id', CommentController.getCommentById);

// Ruta para actualizar un comentario por ID
router.put('/comments/:id', CommentController.updateComment);

// Ruta para eliminar un comentario por ID
router.delete('/comments/:id', CommentController.deleteComment);

module.exports = router;
