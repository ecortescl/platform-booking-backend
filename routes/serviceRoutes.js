// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(csrfProtection);


/**
 * @swagger
 * /api/services/csrf-token:
 *  get:
 *      summary: Get CSRF Token
 *      tags: [Service]
 *      responses:
 *          200:
 *              description: CSRF token retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              csrfToken:
 *                                  type: string
 *                                  description: The CSRF token to be used in subsequent requests
 *                          example:
 *                              csrfToken: "exampleCsrfToken"
 */
router.get('/csrf-token', (req, res) => {
    console.log('CSRF token route hit');
    const token = req.csrfToken();
    res.json({ csrfToken: token });
});

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
router.post('/',csrfProtection, ServiceController.createService);

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
 */

// Ruta para eliminar un servicio por su ID
router.delete('/:id', ServiceController.deleteService);







module.exports = router;
