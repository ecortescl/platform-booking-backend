const { PermissionsRole, Role, Permission } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo permiso para un rol
exports.createPermissionsRole = async (req, res) => {
  try {
    // Crear el permiso para el rol
    const newPermissionsRole = await PermissionsRole.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Permiso para rol creado con éxito',
      permissionsRole: newPermissionsRole
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear permiso para rol', error: err.message });
  }
};

// Obtener todos los permisos de roles
exports.getPermissionsRoles = async (req, res) => {
  try {
    const permissionsRoles = await PermissionsRole.findAll();
    res.status(200).json({ permissionsRoles });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener permisos de roles', error: err.message });
  }
};

// Obtener un permiso de rol por su ID
exports.getPermissionsRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const permissionsRole = await PermissionsRole.findByPk(id);

    if (permissionsRole) {
      res.status(200).json({ permissionsRole });
    } else {
      res.status(404).json({ message: 'Permiso para rol no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener permiso para rol', error: err.message });
  }
};

// Actualizar un permiso de rol por ID
exports.updatePermissionsRole = async (req, res) => {
  try {
    const { id } = req.params;

    const permissionsRole = await PermissionsRole.findByPk(id);

    if (!permissionsRole) {
      return res.status(404).json({ message: 'Permiso para rol no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await permissionsRole.update(req.body);

    res.status(200).json({ message: 'Permiso para rol actualizado con éxito', permissionsRole });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar permiso para rol', error: err.message });
  }
};

// Eliminar un permiso de rol por ID
exports.deletePermissionsRole = async (req, res) => {
  try {
    const { id } = req.params;

    const permissionsRole = await PermissionsRole.findByPk(id);

    if (!permissionsRole) {
      return res.status(404).json({ message: 'Permiso para rol no encontrado' });
    }

    await permissionsRole.destroy();
    res.status(200).json({ message: 'Permiso para rol eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar permiso para rol', error: err.message });
  }
};
