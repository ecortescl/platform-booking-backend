// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Ruta para obtener todos los comentarios
router.get('/', CommentController.getComments);

// Ruta para crear un nuevo comentario
router.post('/', CommentController.createComment);

// Ruta para obtener un comentario por su ID
router.get('/:id', CommentController.getCommentById);

// Ruta para actualizar un comentario por ID
router.put('/:id', CommentController.updateComment);

// Ruta para eliminar un comentario por ID
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
