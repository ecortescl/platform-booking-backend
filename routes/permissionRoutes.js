// routes/permissionRoutes.js

const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');

// Ruta para obtener todos los permisos
router.get('/permissions', PermissionController.getPermissions);

// Ruta para crear un nuevo permiso
router.post('/permissions', PermissionController.createPermission);

// Ruta para obtener un permiso por su ID
router.get('/permissions/:id', PermissionController.getPermissionById);

// Ruta para actualizar un permiso por ID
router.put('/permissions/:id', PermissionController.updatePermission);

// Ruta para eliminar un permiso por ID
router.delete('/permissions/:id', PermissionController.deletePermission);

module.exports = router;
