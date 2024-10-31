// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      Review:
 *          type: object
 *          properties:
 *              date:
 *                  type: date
 *                  description: The date of Review
 *              description:
 *                  type: integer
 *                  description: the details of the review
 *              idUserWriter:
 *                  type: integer
 *                  description: the id of the user who does the review
 *              idUserReceiver:
 *                  type: integer
 *                  description: the id of the user who receives the review
 *          required:
 *              - date
 *              - description
 *              - idUserWriter
 *              - idUserReceiver
 *          example:
 *              date: 2024-10-16
 *              description: El usuario ...
 *              idUserWriter: 1
 *              idUserReceiver: 1
 */

/**
 * @swagger
 * /api/reviews:
 *  get:
 *      summary: return all reviews
 *      tags: [Review]
 *      responses:
 *          200:
 *              description: all reviews
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Review'
 *          500:
 *              description: Error interno al obtener las reviews
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todas las reseñas
router.get('/', authenticateToken, ReviewController.getReviews);

/**
 * @swagger
 * /api/reviews:
 *  post:
 *      summary: create a new review
 *      tags: [Review]
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
 *                      $ref: '#/components/schemas/Review'
 *      responses:
 *          201:
 *              description: new review created
 *          500:
 *              description: Error interno al crear una review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear una nueva reseña
router.post('/', authenticateToken, ReviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *  get:
 *      summary: return a review
 *      tags: [Review]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the review id
 *      responses:
 *          200:
 *              description: return a review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Review'
 *          404:
 *              description: Review no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener una review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener una reseña por su ID
router.get('/:id', authenticateToken, ReviewController.getReviewById);

/**
 * @swagger
 * /api/reviews/{id}:
 *  put:
 *      summary: update a review
 *      tags: [Review]
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
 *            description: the review id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Review'
 *      responses:
 *          200:
 *              description: The review was updated
 *          404:
 *              description: Review no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar la review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar una reseña por su ID
router.put('/:id', authenticateToken, ReviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *  delete:
 *      summary: delete a review
 *      tags: [Review]
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
 *            description: the review id
 *      responses:
 *          200:
 *              description: The review was deleted
 *          404:
 *              description: Review no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar la review
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar una reseña por su ID
router.delete('/:id', authenticateToken, ReviewController.deleteReview);

module.exports = router;
