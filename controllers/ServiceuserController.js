const { ServicesUser, User, Service } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo servicio para un usuario
exports.createServicesUser = async (req, res) => {
  try {
    // Crear el servicio para el usuario
    const newServicesUser = await ServicesUser.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Servicio para usuario creado con éxito',
      servicesUser: newServicesUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear servicio para usuario', error: err.message });
  }
};

// Obtener todos los servicios de usuarios
exports.getServicesUsers = async (req, res) => {
  try {
    const servicesUsers = await ServicesUser.findAll();
    res.status(200).json({ servicesUsers });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicios de usuarios', error: err.message });
  }
};

// Obtener un servicio de usuario por su ID
exports.getServicesUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const servicesUser = await ServicesUser.findByPk(id);

    if (servicesUser) {
      res.status(200).json({ servicesUser });
    } else {
      res.status(404).json({ message: 'Servicio para usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicio para usuario', error: err.message });
  }
};

// Actualizar un servicio de usuario por ID
exports.updateServicesUser = async (req, res) => {
  try {
    const { id } = req.params;

    const servicesUser = await ServicesUser.findByPk(id);

    if (!servicesUser) {
      return res.status(404).json({ message: 'Servicio para usuario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await servicesUser.update(req.body);

    res.status(200).json({ message: 'Servicio para usuario actualizado con éxito', servicesUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar servicio para usuario', error: err.message });
  }
};

// Eliminar un servicio de usuario por ID
exports.deleteServicesUser = async (req, res) => {
  try {
    const { id } = req.params;

    const servicesUser = await ServicesUser.findByPk(id);

    if (!servicesUser) {
      return res.status(404).json({ message: 'Servicio para usuario no encontrado' });
    }

    await servicesUser.destroy();
    res.status(200).json({ message: 'Servicio para usuario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar servicio para usuario', error: err.message });
  }
};
