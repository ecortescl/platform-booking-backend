const { Review, User } = require('../models'); // Importa todos los modelos necesarios

// Crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    // Crear la reseña
    const newReview = await Review.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Reseña creada con éxito',
      review: newReview
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear reseña', error: err.message });
  }
};

// Obtener todas las reseñas
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reseñas', error: err.message });
  }
};

// Obtener una reseña por su ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (review) {
      res.status(200).json({ review });
    } else {
      res.status(404).json({ message: 'Reseña no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reseña', error: err.message });
  }
};

// Actualizar una reseña por ID
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Actualizar solo los campos proporcionados
    await review.update(req.body);

    res.status(200).json({ message: 'Reseña actualizada con éxito', review });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar reseña', error: err.message });
  }
};

// Eliminar una reseña por ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Reseña eliminada con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar reseña', error: err.message });
  }
};

// Obtener reseñas por ID de escritor o receptor
exports.getReviewsByUser = async (req, res) => {
  try {
    const { idUser, role } = req.params;

    // Validar que el rol sea válido
    if (!['writer', 'receiver'].includes(role)) {
      return res.status(400).json({ message: 'El rol debe ser "writer" o "receiver"' });
    }

    // Configurar el criterio de búsqueda basado en el rol
    const whereCondition = role === 'writer' 
      ? { idUserWriter: idUser } 
      : { idUserReceiver: idUser };

    // Buscar reseñas con la condición adecuada
    const reviews = await Review.findAll({
      where: whereCondition,
      include: [
        { model: User, as: 'writer', attributes: ['id'] },
        { model: User, as: 'receiver', attributes: ['id'] },
      ]
    });

    if (reviews.length > 0) {
      res.status(200).json({ reviews });
    } else {
      res.status(404).json({ message: 'No se encontraron reseñas para este usuario' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error: err.message });
  }
};
