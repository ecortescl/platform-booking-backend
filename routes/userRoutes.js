// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

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
 *              - names
 *              - email
 *              - password
 *              - idRole
 *          example:
 *              names: Juan Pablo
 *              email: Juan@gmail.com
 *              password: pablito123
 *              idRole: 1
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: return all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/User'
 */

// Ruta para obtener todos los usuarios
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: create a new user
 *      tags: [User]
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
 */

// Ruta para crear un nuevo usuario
router.post('/', UserController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: return a user
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
 */

// Ruta para obtener un usuario por su ID
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: update a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the user id
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
 */

// Ruta para actualizar un usuario por su ID
router.put('/:id', UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: delete a user
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
 *              description: The user was deleted
 */

// Ruta para eliminar un usuario por su ID
router.delete('/:id', UserController.deleteUser);

router.post('/login', UserController.loginUser); 

module.exports = router;