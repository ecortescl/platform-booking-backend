const { Calendar, User, Slot } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo calendario
exports.createCalendar = async (req, res) => {
  try {
    // Crear el calendario
    const newCalendar = await Calendar.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Calendario creado con éxito',
      calendar: newCalendar
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear calendario', error: err.message });
  }
};

// Obtener todos los calendarios
exports.getCalendars = async (req, res) => {
  try {
    const calendars = await Calendar.findAll();
    res.status(200).json({ calendars });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener calendarios', error: err.message });
  }
};

// Obtener un calendario por su ID
exports.getCalendarById = async (req, res) => {
  try {
    const { id } = req.params;

    const calendar = await Calendar.findByPk(id);

    if (calendar) {
      res.status(200).json({ calendar });
    } else {
      res.status(404).json({ message: 'Calendario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener calendario', error: err.message });
  }
};

// Actualizar un calendario por ID
exports.updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;

    const calendar = await Calendar.findByPk(id);

    if (!calendar) {
      return res.status(404).json({ message: 'Calendario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await calendar.update(req.body);

    res.status(200).json({ message: 'Calendario actualizado con éxito', calendar });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar calendario', error: err.message });
  }
};

// Eliminar un calendario por ID
exports.deleteCalendar = async (req, res) => {
  try {
    const { id } = req.params;

    const calendar = await Calendar.findByPk(id);

    if (!calendar) {
      return res.status(404).json({ message: 'Calendario no encontrado' });
    }

    await calendar.destroy();
    res.status(200).json({ message: 'Calendario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar calendario', error: err.message });
  }
};
