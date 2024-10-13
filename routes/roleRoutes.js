// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

// Ruta para obtener todos los roles
router.get('/', RoleController.getRoles);

// Ruta para crear un nuevo rol
router.post('/', RoleController.createRole);

// Ruta para obtener un rol por su ID
router.get('/:id', RoleController.getRoleById);

// Ruta para actualizar un rol por su ID
router.put('/:id', RoleController.updateRole);

// Ruta para eliminar un rol por su ID
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
