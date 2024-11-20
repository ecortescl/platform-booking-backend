const { Permission, PermissionsRole } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo permiso
exports.createPermission = async (req, res) => {
  try {
    // Crear el permiso
    const newPermission = await Permission.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Permiso creado con éxito',
      permission: newPermission
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear permiso', error: err.message });
  }
};

// Obtener todos los permisos
exports.getPermissions = async (req, res) => {
  try {
    const page = req.query.page != undefined ? parseInt(req.query.page) : undefined
    let permissions

    if(page) {
      const limit = 10;
      const offset = (page -1) * limit;

      permissions = await Permission.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]
      });
    }else {
      permissions = await Permission.findAll();
    }
    res.status(200).json({ permissions });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener permisos', error: err.message });
  }
};

// Obtener un permiso por su ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);

    if (permission) {
      res.status(200).json({ permission });
    } else {
      res.status(404).json({ message: 'Permiso no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener permiso', error: err.message });
  }
};

// Actualizar un permiso por ID
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await permission.update(req.body);

    res.status(200).json({ message: 'Permiso actualizado con éxito', permission });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar permiso', error: err.message });
  }
};

// Eliminar un permiso por ID
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }

    await permission.destroy();
    res.status(200).json({ message: 'Permiso eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar permiso', error: err.message });
  }
};
