const { User, Role, Review, Calendar, Appointment, Comment, ServicesUser } = require('../models'); // Importa todos los modelos necesarios
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { run, names, surnames, email, phone, password, location, specialty, registered, idRole } = req.body;

    // Hash  password antes de guardarla
    const saltRounds = 10; // Number of rounds  hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash  password

    // Crear el usuario con el password hasheado
    const newUser = await User.create({
      run,
      names,
      surnames,
      email,
      phone,
      password: hashedPassword, // Usar la contraseña hash
      location,
      specialty,
      registered,
      idRole
    });

    // Respuesta exitosa
    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: newUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear usuario', error: err.message });
  }
};

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
exports.loginUser = async (req, res) => {
  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ 
      where: { email: req.body.email } ,
      include: [{
        model: Role,
        attributes: ['name']
      }]
    });

    if (!user) return res.status(404).send('No existe un usuario con este email');

    // Verificar la contraseña
    const validPass = await bcrypt.compare(req.body.password, user.password);

    // Debugging: Log valid password result
    console.log('Password valid:', validPass);

    if (!validPass) return res.status(400).send('Contraseña incorrecta.');

    // Crear y asignar un token JWT
    const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET);
    res.header('Authorization', `Bearer ${token}`).send('Inicio de sesión exitoso.');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};
