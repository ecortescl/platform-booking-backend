// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              run:
 *                  type: string
 *                  description: The run of user
 *              names:
 *                  type: string
 *                  description: The names of user
 *              surnames:
 *                  type: string
 *                  description: The surnames of user
 *              email:
 *                  type: string
 *                  description: The email of user
 *              phone:
 *                  type: string
 *                  description: The phone of user
 *              password:
 *                  type: string
 *                  description: The password of user
 *              location:
 *                  type: string
 *                  description: The location of professional user
 *              specialty:
 *                  type: string
 *                  description: The specialty of professional user
 *              registered:
 *                  type: string
 *                  description: The state of register of user
 *              idRole:
 *                  type: integer
 *                  description: The role id of user
 *          required:
 *              - run
 *              - names
 *              - email
 *              - password
 *              - idRole
 *          example:
 *              run: 1111111-1
 *              names: Juan Pablo
 *              email: Juan@gmail.com
 *              password: pablito123
 *              idRole: 1
 *      Message:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Mensaje del servidor
 *          example:
 *              message: ... No encontrad@
 *      MessageError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Mensaje del servidor
 *              error:
 *                  type: string
 *                  description: Mensaje de error del servidor
 *      
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: return all users
 *      tags: [User]
 *      responses:
 *          201:
 *              description: all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/User'
 *          500:
 *              description: Error interno al obtener usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los usuarios
router.get('/', authenticateToken, UserController.getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: create an new user
 *      tags: [User]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: new user created
 *          500:
 *              description: Error interno al crear un usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo usuario
router.post('/', authenticateToken, UserController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: return an user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the user id
 *      responses:
 *          200:
 *              description: return a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/User'
 *          404: 
 *              description: Usuario no encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un usuario.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un usuario por su ID
router.get('/:id', authenticateToken, UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: update an user
 *      tags: [User]
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
 *            description: the user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was updated
 *          404: 
 *              description: Usuario no encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar el usuario.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un usuario por su ID
router.put('/:id', authenticateToken, UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: delete an user
 *      tags: [User]
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
 *            description: the user id
 *      responses:
 *          200:
 *              description: The user was deleted
 *          404:
 *              description: Usuario no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un usuario por su ID
router.delete('/:id', authenticateToken, UserController.deleteUser);

module.exports = router;
