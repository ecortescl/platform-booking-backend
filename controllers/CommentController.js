const { where } = require('sequelize');
const { Comment, User, Appointment } = require('../models'); // Importa todos los modelos necesarios

// Crear un nuevo comentario
exports.createComment = async (req, res) => {
  try {
    // Crear el comentario
    const newComment = await Comment.create(req.body);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Comentario creado con éxito',
      comment: newComment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear comentario', error: err.message });
  }
};

// Obtener todos los comentarios
exports.getComments = async (req, res) => {
  try {
    const page = req.query.page != undefined ? parseInt(req.query.page) : undefined
    let comments
    if(page) {
      const limit = 10;
      const offset = (page -1) * limit;

      comments = await Comment.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]
      });
    }else {
      comments = await Comment.findAll();
    }
    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener comentarios', error: err.message });
  }
};

// Obtener un comentario por su ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (comment) {
      res.status(200).json({ comment });
    } else {
      res.status(404).json({ message: 'Comentario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener comentario', error: err.message });
  }
};

// Actualizar un comentario por ID
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await comment.update(req.body);

    res.status(200).json({ message: 'Comentario actualizado con éxito', comment });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar comentario', error: err.message });
  }
};

// Eliminar un comentario por ID
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Comentario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar comentario', error: err.message });
  }
};

exports.getCommentsByIdAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = Comment.findAll({ where: { idAppointment: id} })

    res.status(200).json(comments);
  }catch(error) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }
}
