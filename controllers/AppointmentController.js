const { Appointment, User, Slot, Comment } = require('../models'); // Importa todos los modelos necesarios

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
  try {
    // Crear la cita
    const newAppointment = await Appointment.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Cita creada con éxito',
      appointment: newAppointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear cita', error: err.message });
  }
};

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: User, as: 'UserClient', attributes: ['id', 'names', 'surnames'] }, // Incluir detalles del cliente
        { model: User, as: 'UserProfessional', attributes: ['id', 'names', 'surnames'] }, // Incluir detalles del profesional
        { model: Slot, attributes: ['id', 'startTime', 'endTime'] }, // Incluir detalles del slot
        { model: Comment, attributes: ['id', 'comments'] } // Incluir detalles de los comentarios
      ]
    });
    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas', error: err.message });
  }
};

// Obtener una cita por su ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: User, as: 'UserClient', attributes: ['id', 'names', 'surnames'] }, // Incluir detalles del cliente
        { model: User, as: 'UserProfessional', attributes: ['id', 'names', 'surnames'] }, // Incluir detalles del profesional
        { model: Slot, attributes: ['id', 'startTime', 'endTime'] }, // Incluir detalles del slot
        { model: Comment, attributes: ['id', 'comments'] } // Incluir detalles de los comentarios
      ]
    });

    if (appointment) {
      res.status(200).json({ appointment });
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cita', error: err.message });
  }
};

// Actualizar una cita por ID
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Actualizar solo los campos proporcionados
    await appointment.update(req.body);

    res.status(200).json({ message: 'Cita actualizada con éxito', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar cita', error: err.message });
  }
};

// Eliminar una cita por ID
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Cita eliminada con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar cita', error: err.message });
  }
};
