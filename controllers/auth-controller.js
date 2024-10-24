const { body, validationResult } = require('express-validator');

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

//Método para obtener CRSF
exports.csrfToken = (req, res) => {
    const token = req.csrfToken();
    res.json({ csrfToken: token });
};