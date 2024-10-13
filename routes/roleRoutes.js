// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

// Ruta para obtener todos los roles
router.get('/roles', RoleController.getRoles);

// Ruta para crear un nuevo rol
router.post('/roles', RoleController.createRole);

// Ruta para obtener un rol por su ID
router.get('/roles/:id', RoleController.getRoleById);

// Ruta para actualizar un rol por su ID
router.put('/roles/:id', RoleController.updateRole);

// Ruta para eliminar un rol por su ID
router.delete('/roles/:id', RoleController.deleteRole);

module.exports = router;
