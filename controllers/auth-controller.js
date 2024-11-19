const { body, validationResult } = require("express-validator");
const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Método para inciar sesión
exports.loginUser = [
  // Validation and sanitization
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacía"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: Role,
            attributes: ["name"],
          },
        ],
      });

      if (!user) return res.status(400).json({message: "No existe un Usuario con este email."});

      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (!validPass)
        return res.status(400).json({message: "Contraseña incorrecta."});

      const token = jwt.sign(
        { id: user.id, role: user.Role.name },
        process.env.JWT_SECRET
      );

      res.header("Authorization", `Bearer ${token}`).json({
        message: "Inicio de sesión exitoso.",
        token: token,
        user: user
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error al iniciar sesión", error: err.message });
    }
  },
];