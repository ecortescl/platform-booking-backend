// routes/permissionsRoleRoutes.js

const express = require('express');
const router = express.Router();
const PermissionsRoleController = require('../controllers/PermissionRoleController');

// Ruta para obtener todos los permisos de roles
router.get('/permissions-roles', PermissionsRoleController.getPermissionsRoles);

// Ruta para crear un nuevo permiso para un rol
router.post('/permissions-roles', PermissionsRoleController.createPermissionsRole);

// Ruta para obtener un permiso de rol por su ID
router.get('/permissions-roles/:id', PermissionsRoleController.getPermissionsRoleById);

// Ruta para actualizar un permiso de rol por su ID
router.put('/permissions-roles/:id', PermissionsRoleController.updatePermissionsRole);

// Ruta para eliminar un permiso de rol por su ID
router.delete('/permissions-roles/:id', PermissionsRoleController.deletePermissionsRole);

module.exports = router;
