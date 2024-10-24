const { User, Role, Review, Calendar, Appointment, Comment, ServicesUser } = require('../models'); // Importa todos los modelos necesarios
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

// Crear un nuevo usuario
exports.createUser = [
  // Validation and sanitization
  body('run').trim().isLength({ min: 1 }).escape(),
  body('names').trim().isLength({ min: 2 }).escape(),
  body('surnames').trim().isLength({ min: 2 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').optional().trim().escape(),
  body('password').isLength({ min: 6 }).escape(),
  body('location').optional().trim().escape(),
  body('specialty').optional().trim().escape(),
  body('registered').optional().isBoolean(),
  body('idRole').optional().isInt(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { run, names, surnames, email, phone, password, location, specialty, registered, idRole } = req.body;

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        run,
        names,
        surnames,
        email,
        phone,
        password: hashedPassword,
        location,
        specialty,
        registered,
        idRole
      });

      res.status(201).json({
        message: 'Usuario creado con éxito',
        user: newUser
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al crear usuario', error: err.message });
    }
  }
];


// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const { run, names, surnames, email, phone, password, location, specialty, registered, idRole } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    await user.update(req.body);

    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
  }
};


// Método para inciar sesión
exports.loginUser = [
  // Validation and sanitization
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().withMessage('La contraseña no debe estar vacía'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        include: [{
          model: Role,
          attributes: ['name']
        }]
      });

      if (!user) return res.status(400).send('Email o contraseña incorrectos.');

      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (!validPass) return res.status(400).send('Email o contraseña incorrectos.');

      const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET);
      res.header('Authorization', `Bearer ${token}`).send('Inicio de sesión exitoso.');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    }
  }
];
