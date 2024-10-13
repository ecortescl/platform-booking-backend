const { Role, User, PermissionsRole } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    // Crear el rol
    const newRole = await Role.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Rol creado con éxito',
      role: newRole
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear rol', error: err.message });
  }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        { model: User, attributes: ['id', 'names', 'surnames'] }, // Incluir detalles de los usuarios asociados
        { model: PermissionsRole, attributes: ['idPermission'] } // Incluir detalles de permisos asociados
      ]
    });
    res.status(200).json({ roles });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener roles', error: err.message });
  }
};

// Obtener un rol por su ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'names', 'surnames'] }, // Incluir detalles de los usuarios asociados
        { model: PermissionsRole, attributes: ['idPermission'] } // Incluir detalles de permisos asociados
      ]
    });

    if (role) {
      res.status(200).json({ role });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener rol', error: err.message });
  }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await role.update(req.body);

    res.status(200).json({ message: 'Rol actualizado con éxito', role });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar rol', error: err.message });
  }
};

// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await role.destroy();
    res.status(200).json({ message: 'Rol eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar rol', error: err.message });
  }
};
