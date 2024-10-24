// routes/permissionsRoleRoutes.js

const express = require('express');
const router = express.Router();
const PermissionsRoleController = require('../controllers/PermissionRoleController');

/**
 * @swagger  
 * components:
 *  schemas:
 *      PermissionRole:
 *          type: object
 *          properties:
 *              idRole:
 *                  type: integer
 *                  description: the id of the role that has the permission
 *              idPermission:
 *                  type: integer
 *                  description: the id of the permission that has the role 
 *          required:
 *              - idRole
 *              - idPermission
 *          example:
 *              idRole: 1
 *              idPermission: 1
 */

/**
 * @swagger
 * /api/permissionsRole:
 *  get:
 *      summary: return all PermissionRole
 *      tags: [PermissionRole]
 *      responses:
 *          200:
 *              description: all PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/PermissionRole'
 *          500:
 *              description: Error interno al obtener los PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los permisos de roles
router.get('/', PermissionsRoleController.getPermissionsRoles);

/**
 * @swagger
 * /api/permissionsRole:
 *  post:
 *      summary: create a new PermissionRole
 *      tags: [PermissionRole]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/PermissionRole'
 *      responses:
 *          200:
 *              description: new PermissionRole created
 *          500:
 *              description: Error interno al crear un PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo permiso para un rol
router.post('/', PermissionsRoleController.createPermissionsRole);

/**
 * @swagger
 * /api/permissionsRole/{id}:
 *  get:
 *      summary: return a PermissionRole
 *      tags: [PermissionRole]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the PermissionRole id
 *      responses:
 *          200:
 *              description: return a PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/PermissionRole'
 *          404:
 *              description: PermissionRole no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener una PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un permiso de rol por su ID
router.get('/:id', PermissionsRoleController.getPermissionsRoleById);

/**
 * @swagger
 * /api/permissionsRole/{id}:
 *  put:
 *      summary: update a PermissionRole
 *      tags: [PermissionRole]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: thePermissionRole id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/PermissionRole'
 *      responses:
 *          200:
 *              description: The PermissionRole was updated
 *          404:
 *              description: PermissionRole no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar un PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un permiso de rol por su ID
router.put('/:id', PermissionsRoleController.updatePermissionsRole);

/**
 * @swagger
 * /api/permissionsRole/{id}:
 *  delete:
 *      summary: delete a role permission
 *      tags: [PermissionRole]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the PermissionRole id
 *      responses:
 *          200:
 *              description: The PermissionRole was deleted
 *          404:
 *              description: PermissionRole no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar un PermissionRole
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un permiso de rol por su ID
router.delete('/:id', PermissionsRoleController.deletePermissionsRole);

module.exports = router;
