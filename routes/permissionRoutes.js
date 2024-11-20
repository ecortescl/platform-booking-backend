// routes/permissionRoutes.js

const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      Permission:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of permission
 *          required:
 *              - name
 *          example:
 *              name: edit_profile
 */

/**
 * @swagger
 * /api/permissions:
 *  get:
 *      summary: return all permissions
 *      tags: [Permission]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: string
 *          required: false
 *          description: number of page (10 elements per page)
 *      responses:
 *          200:
 *              description: all permissions
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Permission'
 *          500:
 *              description: Error interno al obtener los permissions
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los permisos
router.get('/', authenticateToken, PermissionController.getPermissions);

/**
 * @swagger
 * /api/permissions:
 *  post:
 *      summary: create a new permission
 *      tags: [Permission]

 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Permission'
 *      responses:
 *          200:
 *              description: new comment created
 *          500:
 *              description: Error interno al crear un permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo permiso
router.post('/', authenticateToken, PermissionController.createPermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *  get:
 *      summary: return a permission
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the permission id
 *      responses:
 *          200:
 *              description: return a permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Permission'
 *          404:
 *              description: Permission no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un permiso por su ID
router.get('/:id', authenticateToken, PermissionController.getPermissionById);

/**
 * @swagger
 * /api/permissions/{id}:
 *  put:
 *      summary: update a permission
 *      tags: [Permission]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the permission id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Permission'
 *      responses:
 *          200:
 *              description: The permission was updated
 *          404:
 *              description: Permission no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar un permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un permiso por ID
router.put('/:id', authenticateToken, PermissionController.updatePermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *  delete:
 *      summary: delete a permission
 *      tags: [Permission]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the permission id
 *      responses:
 *          200:
 *              description: The permission was deleted
 *          404:
 *              description: Permission no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar un permission
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un permiso por ID
router.delete('/:id', authenticateToken, PermissionController.deletePermission);

module.exports = router;
