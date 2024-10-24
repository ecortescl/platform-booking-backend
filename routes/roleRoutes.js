// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

/**
 * @swagger  
 * components:
 *  schemas:
 *      Role:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of role
 *          required:
 *              - name
 *          example:
 *              name: client
 */

/**
 * @swagger
 * /api/roles:
 *  get:
 *      summary: return all roles
 *      tags: [Role]
 *      responses:
 *          200:
 *              description: all roles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Role'
 *          500:
 *              description: Error interno al obtener los roles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los roles
router.get('/', RoleController.getRoles);

/**
 * @swagger
 * /api/roles:
 *  post:
 *      summary: create a new role
 *      tags: [Role]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Role'
 *      responses:
 *          201:
 *              description: new role created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al crear un role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo rol
router.post('/', RoleController.createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *  get:
 *      summary: return a role
 *      tags: [Role]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the role id
 *      responses:
 *          200:
 *              description: return a role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Role'
 *          404:
 *              description: Role no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener el role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un rol por su ID
router.get('/:id', RoleController.getRoleById);

/**
 * @swagger
 * /api/roles/{id}:
 *  put:
 *      summary: update a role
 *      tags: [Role]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the role id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Role'
 *      responses:
 *          200:
 *              description: The role was updated
 *          404:
 *              description: Role no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar el role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un rol por su ID
router.put('/:id', RoleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *  delete:
 *      summary: delete a role
 *      tags: [Role]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the role id
 *      responses:
 *          200:
 *              description: The role was deleted
 *          404:
 *              description: Role no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar el role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un rol por su ID
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
