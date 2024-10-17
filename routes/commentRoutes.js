// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

/**
 * @swagger  
 * components:
 *  schemas:
 *      Comment:
 *          type: object
 *          properties:
 *              comments:
 *                  type: string
 *                  description: The comment of appointment
 *              idUser:
 *                  type: integer
 *                  description: the id of the user who comment
 *              idAppointment:
 *                  type: integer
 *                  description: the id of the appointment who reveices the comment 
 *          required:
 *              - comments
 *              - idUser
 *              - idAppointment
 *          example:
 *              comments: La cita fue ...
 *              idUser: 1
 *              idAppointment: 1
 */

/**
 * @swagger
 * /api/comments:
 *  get:
 *      summary: return all comments
 *      tags: [Comment]
 *      responses:
 *          200:
 *              description: all comments
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Comment'
 */

// Ruta para obtener todos los comentarios
router.get('/', CommentController.getComments);

/**
 * @swagger
 * /api/comments:
 *  post:
 *      summary: create a new comment
 *      tags: [Comment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Comment'
 *      responses:
 *          200:
 *              description: new comment created
 */

// Ruta para crear un nuevo comentario
router.post('/', CommentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *      summary: return a comment
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the comment id
 *      responses:
 *          200:
 *              description: return a comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Comment'
 */

// Ruta para obtener un comentario por su ID
router.get('/:id', CommentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *  put:
 *      summary: update a comment
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the comment id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Comment'
 *      responses:
 *          200:
 *              description: The comment was updated
 */

// Ruta para actualizar un comentario por ID
router.put('/:id', CommentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *      summary: delete a comment
 *      tags: [Calendar]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the comment id
 *      responses:
 *          200:
 *              description: The comment was deleted
 */

// Ruta para eliminar un comentario por ID
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
