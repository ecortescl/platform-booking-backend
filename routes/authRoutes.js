const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * @swagger
 * paths:
 *   /api/login:
 *     post:
 *       tags: [Auth]
 *       summary: "Autenticación de usuario"
 *       operationId: "loginUser"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "admin@test.cl"
 *                 password:
 *                   type: string
 *                   example: "admin123"
 *       responses:
 *         '200':
 *           description: "Login exitoso"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         '404':
 *           description: "No existe un Usuario con este email"
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#components/schemas/Message'
 *         '400':
 *           description: "Contraseña incorrecta"
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#components/schemas/Message'
 *         '500':
 *           description: "Error interno del servidor al inciar sesión"
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#components/schemas/MessageError'
 *       security: []
 */

router.post('/login', AuthController.loginUser);

/**
 * @swagger
 * /api/csrf-token:
 *  get:
 *      summary: Get CSRF Token (this is removed if not needed)
 *      tags: [Auth]
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

router.get('/csrf-token', AuthController.csrfToken); // You can remove this if you no longer need the CSRF endpoint

module.exports = router;
