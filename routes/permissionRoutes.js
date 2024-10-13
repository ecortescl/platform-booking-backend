// routes/permissionRoutes.js

const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');

// Ruta para obtener todos los permisos
router.get('/', PermissionController.getPermissions);

// Ruta para crear un nuevo permiso
router.post('/', PermissionController.createPermission);

// Ruta para obtener un permiso por su ID
router.get('/:id', PermissionController.getPermissionById);

// Ruta para actualizar un permiso por ID
router.put('/:id', PermissionController.updatePermission);

// Ruta para eliminar un permiso por ID
router.delete('/:id', PermissionController.deletePermission);

module.exports = router;
