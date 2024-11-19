// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authenticateToken }= require('../middleware/authMiddleware')

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
 *          500:
 *              description: Error interno al obtener los comments
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los comentarios
router.get('/', authenticateToken, CommentController.getComments);

/**
 * @swagger
 * /api/comments:
 *  post:
 *      summary: create a new comment
 *      tags: [Comment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
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
 *          500:
 *              description: Error interno al crear un comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo comentario
router.post('/', authenticateToken, CommentController.createComment);

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
 *          404:
 *              description: Comment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un comentario por su ID
router.get('/:id', authenticateToken, CommentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *  put:
 *      summary: update a comment
 *      tags: [Comment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the comment id
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
 *          404:
 *              description: Comment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar un comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un comentario por ID
router.put('/:id', authenticateToken, CommentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *      summary: delete a comment
 *      tags: [Comment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the comment id
 *      responses:
 *          200:
 *              description: The comment was deleted
 *          404:
 *              description: Comment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar un comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un comentario por ID
router.delete('/:id', authenticateToken, CommentController.deleteComment);

/**
 * @swagger
 * /api/comments/appointment/{id}:
 *  get:
 *      summary: return all comments for an appointment id
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the appointment id
 *      responses:
 *          200:
 *              description: return all comment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Comment'
 *          500:
 *              description: Error interno al obtener comments
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un comentario por su ID
router.get('/appointment/:id', authenticateToken, CommentController.getCommentById);

module.exports = router;
