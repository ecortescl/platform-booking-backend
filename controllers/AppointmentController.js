const { Appointment, User, Slot, Comment } = require('../models'); // Importa todos los modelos necesarios
const { enviarCorreoConfirmacion, enviarCorreoRecordatorio } = require('../services/emailService');
const { enviarSmsConfirmacion, enviarSmsRecordatorio } = require('../services/smsService');

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

    try {
      if (newAppointment) {
        // Consultar los datos del cliente y del slot de la cita
        const appointmentDetails = await Appointment.findByPk(newAppointment.id, {
          include: [
            { model: User, as: 'client', attributes: ['email', 'phone'] }, // Asume alias 'client' para el cliente
            { model: Slot, attributes: ['date', 'startTime'] } // Atributos de fecha y hora del slot
          ]
        });

        // Verificar si se encontraron los detalles de la cita
        if (appointmentDetails) {
          // Obtener los detalles de la cita para la notificación
          const detallesCita = {
            fecha: appointmentDetails.Slot.date,
            hora: appointmentDetails.Slot.time,
            clienteEmail: appointmentDetails.client.email,
            clienteTelefono: appointmentDetails.client.phone,
          };

          // Enviar confirmación por correo y SMS
          await enviarCorreoConfirmacion(detallesCita.clienteEmail, detallesCita);
          // Enviar confirmación por SMS si hay un número de teléfono
          if (detallesCita.clienteTelefono) {
            await enviarSmsConfirmacion(detallesCita.clienteTelefono, detallesCita);
          }
        }
      }
    }catch {}
  } catch (err) {
    res.status(500).json({ message: 'Error al crear cita', error: err.message });
  }
};

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas', error: err.message });
  }
};

// Obtener una cita por su ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

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

// Obtener citas por ID de cliente o profesional
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { idUser, role } = req.params;

    // Configurar el criterio de búsqueda basado en el rol
    const whereCondition = role === 'client'
      ? { idUserClient: idUser }
      : { idUserProfessional: idUser };

    // Buscar citas con la condición adecuada
    const appointments = await Appointment.findAll({
      where: whereCondition,
      include: [
        { model: User, as: 'client', attributes: ['id'] },
        { model: User, as: 'professional', attributes: ['id'] },
        { model: Slot, attributes: ['id', 'startTime', 'endTime'] }
      ]
    });

    if (appointments.length > 0) {
      res.status(200).json({ appointments });
    } else {
      res.status(404).json({ message: 'No se encontraron citas para este usuario' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas', error: err.message });
  }
};

