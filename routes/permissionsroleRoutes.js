// routes/permissionsRoleRoutes.js

const express = require('express');
const router = express.Router();
const PermissionsRoleController = require('../controllers/PermissionRoleController');

// Ruta para obtener todos los permisos de roles
router.get('/', PermissionsRoleController.getPermissionsRoles);

// Ruta para crear un nuevo permiso para un rol
router.post('/', PermissionsRoleController.createPermissionsRole);

// Ruta para obtener un permiso de rol por su ID
router.get('/:id', PermissionsRoleController.getPermissionsRoleById);

// Ruta para actualizar un permiso de rol por su ID
router.put('/:id', PermissionsRoleController.updatePermissionsRole);

// Ruta para eliminar un permiso de rol por su ID
router.delete('/:id', PermissionsRoleController.deletePermissionsRole);

module.exports = router;
