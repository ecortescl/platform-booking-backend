const { Service, ServicesUser } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo servicio
exports.createService = async (req, res) => {
  try {
    // Crear el servicio
    const newService = await Service.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Servicio creado con éxito',
      service: newService
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear servicio', error: err.message });
  }
};

// Obtener todos los servicios
exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicios', error: err.message });
  }
};

// Obtener un servicio por su ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (service) {
      res.status(200).json({ service });
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicio', error: err.message });
  }
};

// Actualizar un servicio por ID
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await service.update(req.body);

    res.status(200).json({ message: 'Servicio actualizado con éxito', service });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar servicio', error: err.message });
  }
};

// Eliminar un servicio por ID
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    await service.destroy();
    res.status(200).json({ message: 'Servicio eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar servicio', error: err.message });
  }
};
