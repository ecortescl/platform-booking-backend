// routes/servicesUserRoutes.js

const express = require('express');
const router = express.Router();
const ServicesUserController = require('../controllers/ServiceuserController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      ServiceUser:
 *          type: object
 *          properties:
 *              idUser:
 *                  type: integer
 *                  description: The id of user
 *              idService:
 *                  type: integer
 *                  description: The id of service
 *          required:
 *              - idUser
 *              - idService
 *          example:
 *              idUser: 1
 *              idService: 1
 */

/**
 * @swagger
 * /api/servicesUser:
 *  get:
 *      summary: return all ServiceUser
 *      tags: [ServiceUser]
 *      responses:
 *          200:
 *              description: all ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/ServiceUser'
 *          500:
 *              description: Error interno al obtener los ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los servicios de usuarios
router.get('/', authenticateToken, ServicesUserController.getServicesUsers);

/**
 * @swagger
 * /api/servicesUser:
 *  post:
 *      summary: create a new ServiceUser
 *      tags: [ServiceUser]
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
 *                      $ref: '#/components/schemas/ServiceUser'
 *      responses:
 *          201:
 *              description: new ServiceUser created
 *          500:
 *              description: Error interno al crear un ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo servicio para un usuario
router.post('/', authenticateToken, ServicesUserController.createServicesUser);

/**
 * @swagger
 * /api/servicesUser/{id}:
 *  get:
 *      summary: return a serviceUser
 *      tags: [ServiceUser]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the ServiceUser id
 *      responses:
 *          200:
 *              description: return a ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ServiceUser'
 *          404:
 *              description: ServiceUser no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un servicio de usuario por su ID
router.get('/:id', authenticateToken, ServicesUserController.getServicesUserById);

/**
 * @swagger
 * /api/servicesUser/{id}:
 *  put:
 *      summary: update a ServiceUser
 *      tags: [ServiceUser]
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
 *            description: the ServiceUser id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ServiceUser'
 *      responses:
 *          200:
 *              description: The ServiceUser was updated
 *          404:
 *              description: ServiceUser no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar el ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un servicio de usuario por su ID
router.put('/:id', authenticateToken, ServicesUserController.updateServicesUser);

/**
 * @swagger
 * /api/servicesUser/{id}:
 *  delete:
 *      summary: delete a ServiceUser
 *      tags: [ServiceUser]
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
 *            description: the ServiceUser id
 *      responses:
 *          200:
 *              description: The ServiceUser was deleted
 *          404:
 *              description: ServiceUser no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar el ServiceUser
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un servicio de usuario por su ID
router.delete('/:id', authenticateToken, ServicesUserController.deleteServicesUser);

module.exports = router;
