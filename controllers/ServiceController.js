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
    const page = req.query.page != undefined ? parseInt(req.query.page) : undefined
    let services

    if(page) {
      const limit = 10;
      const offset = (page -1) * limit;

      services = await Service.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]
      });
    }else {
      services = await Service.findAll();
    }
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



// Obtener servicios por ID de usuario
exports.getServicesByUserId = async (req, res) => {
  try {
    const { idUser } = req.params;

    // Encuentra los servicios asociados al usuario
    const userServices = await ServicesUser.findAll({
      where: { idUser },
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'description']
        }
      ]
    });

    if (userServices.length > 0) {
      // Extraer solo la información de los servicios
      const services = userServices.map(us => us.Service);
      res.status(200).json({ services });
    } else {
      res.status(404).json({ message: 'No se encontraron servicios para este usuario' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicios por usuario', error: err.message });
  }
};
