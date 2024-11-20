const { Slot, Calendar, Appointment } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo slot
exports.createSlot = async (req, res) => {
  try {
    // Crear el slot
    const newSlot = await Slot.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Slot creado con éxito',
      slot: newSlot
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear slot', error: err.message });
  }
};

// Obtener todos los slots
exports.getSlots = async (req, res) => {
  try {
    const page = req.query.page != undefined ? parseInt(req.query.page) : undefined
    let slots

    if(page) {
      const limit = 10;
      const offset = (page -1) * limit

      slots = await Slot.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]
      });
    }else {
      slots = await Slot.findAll();
    }
    res.status(200).json({ slots });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener slots', error: err.message });
  }
};

// Obtener un slot por su ID
exports.getSlotById = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findByPk(id);

    if (slot) {
      res.status(200).json({ slot });
    } else {
      res.status(404).json({ message: 'Slot no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener slot', error: err.message });
  }
};

// Actualizar un slot por ID
exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: 'Slot no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await slot.update(req.body);

    res.status(200).json({ message: 'Slot actualizado con éxito', slot });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar slot', error: err.message });
  }
};

// Eliminar un slot por ID
exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await Slot.findByPk(id);

    if (!slot) {
      return res.status(404).json({ message: 'Slot no encontrado' });
    }

    await slot.destroy();
    res.status(200).json({ message: 'Slot eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar slot', error: err.message });
  }
};
