// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) return res.status(401).send('Acceso denegado. No hay token.');

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET); 
    // Adjuntar la información del usuario al objeto de la solicitud
    req.user = verified; 
    next(); // Pasar al siguiente middleware o controlador de ruta
  } catch (err) {
    res.status(400).send('Token inválido.'); // Manejar el token inválido
  }
};

module.exports = { authenticateToken };
