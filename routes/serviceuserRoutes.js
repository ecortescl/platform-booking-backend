// routes/servicesUserRoutes.js

const express = require('express');
const router = express.Router();
const ServicesUserController = require('../controllers/ServiceuserController');

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
 */

// Ruta para obtener todos los servicios de usuarios
router.get('/', ServicesUserController.getServicesUsers);

/**
 * @swagger
 * /api/servicesUser:
 *  post:
 *      summary: create a new ServiceUser
 *      tags: [ServiceUser]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ServiceUser'
 *      responses:
 *          200:
 *              description: new ServiceUser created
 */

// Ruta para crear un nuevo servicio para un usuario
router.post('/', ServicesUserController.createServicesUser);

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
 */

// Ruta para obtener un servicio de usuario por su ID
router.get('/:id', ServicesUserController.getServicesUserById);

/**
 * @swagger
 * /api/servicesUser/{id}:
 *  put:
 *      summary: update a ServiceUser
 *      tags: [ServiceUser]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the ServiceUser id
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
 */

// Ruta para actualizar un servicio de usuario por su ID
router.put('/:id', ServicesUserController.updateServicesUser);

/**
 * @swagger
 * /api/servicesUser/{id}:
 *  delete:
 *      summary: delete a ServiceUser
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
 *              description: The ServiceUser was deleted
 */

// Ruta para eliminar un servicio de usuario por su ID
router.delete('/:id', ServicesUserController.deleteServicesUser);

module.exports = router;
