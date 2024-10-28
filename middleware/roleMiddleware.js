
// Middleware para verificar roles
const verifyRole = (role) => {
    return (req, res, next) => {
      // Verificar si el rol del usuario coincide con el rol requerido
      if (req.user.role !== role) {
        return res.status(403).send('Acceso denegado. No tienes permisos.'); // Denegar acceso si los roles no coinciden
      }
      next(); // Si el rol coincide, pasar al siguiente middleware o controlador
    };
  };
  
  module.exports = { verifyRole }; // Exportar el middleware
  