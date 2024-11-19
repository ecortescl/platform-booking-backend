// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      Service:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of service
 *              description:
 *                  type: string
 *                  description: The description of service
 *          required:
 *              - name
 *              - description
 *          example:
 *              name: serviceName
 *              description: El servicio...
 */

/**
 * @swagger
 * /api/services:
 *  get:
 *      summary: return all services
 *      tags: [Service]
 *      responses:
 *          200:
 *              description: all services
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Service'
 *          500:
 *              description: Error interno al obtener los services
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los servicios
router.get('/', authenticateToken, ServiceController.getServices);

/**
 * @swagger
 * /api/services:
 *  post:
 *      summary: Create a new service
 *      tags: [Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Service'

 *      responses:
 *          201:
 *              description: new service created
 *          500:
 *              description: Error interno al crear un service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */
// Ruta para crear un nuevo servicio
router.post('/', authenticateToken, ServiceController.createService);

/**
 * @swagger
 * /api/services/{id}:
 *  get:
 *      summary: return a service
 *      tags: [Service]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the service id
 *      responses:
 *          200:
 *              description: return a service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Service'
 *          404:
 *              description: Service no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener el service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un servicio por su ID
router.get('/:id', authenticateToken, ServiceController.getServiceById);

/**
 * @swagger
 * /api/services/{id}:
 *  put:
 *      summary: update a service
 *      tags: [Service]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the service id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Service'
 *      responses:
 *          200:
 *              description: The service was updated
 *          404:
 *              description: Service no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar el service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un servicio por su ID
router.put('/:id', authenticateToken, ServiceController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *  delete:
 *      summary: delete a service
 *      tags: [Service]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the service id
 *      responses:
 *          200:
 *              description: The service was deleted
 *          404:
 *              description: Service no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar el service
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un servicio por su ID
router.delete('/:id', authenticateToken, ServiceController.deleteService);


/**
 * @swagger
 * /api/services/user/{idUser}:
 *  get:
 *      summary: Obtener todos los servicios de un usuario
 *      tags: [Service]
 *      parameters:
 *        - in: path
 *          name: idUser
 *          schema:
 *              type: string
 *          required: true
 *          description: ID del usuario cuyos servicios se quieren obtener
 *      responses:
 *          200:
 *              description: Lista de servicios del usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Service'
 *          404:
 *              description: No se encontraron servicios para este usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener servicios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los servicios de un usuario por su ID
router.get('/user/:idUser', authenticateToken, ServiceController.getServicesByUserId);

module.exports = router;
