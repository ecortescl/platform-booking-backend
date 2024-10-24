// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

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
router.get('/', ServiceController.getServices);

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
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: New service created
 */
// Ruta para crear un nuevo servicio
router.post('/', ServiceController.createService);

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
router.get('/:id', ServiceController.getServiceById);

/**
 * @swagger
 * /api/services/{id}:
 *  put:
 *      summary: update a service
 *      tags: [Service]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the service id
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
router.put('/:id', ServiceController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *  delete:
 *      summary: delete a service
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
router.delete('/:id', ServiceController.deleteService);

module.exports = router;
