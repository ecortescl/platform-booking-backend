// routes/permissionRoutes.js

const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');

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
 *      responses:
 *          200:
 *              description: all permissions
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Permission'
 */

// Ruta para obtener todos los permisos
router.get('/', PermissionController.getPermissions);

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
 */

// Ruta para crear un nuevo permiso
router.post('/', PermissionController.createPermission);

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
 */

// Ruta para obtener un permiso por su ID
router.get('/:id', PermissionController.getPermissionById);

/**
 * @swagger
 * /api/permissions/{id}:
 *  put:
 *      summary: update a permission
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the permission id
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
 */

// Ruta para actualizar un permiso por ID
router.put('/:id', PermissionController.updatePermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *  delete:
 *      summary: delete a permission
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
 *              description: The permission was deleted
 */

// Ruta para eliminar un permiso por ID
router.delete('/:id', PermissionController.deletePermission);

module.exports = router;
