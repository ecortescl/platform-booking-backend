require("dotenv").config(); // Cargar variables de entorno

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root", // Usualmente 'root' en MySQL (XAMPP por defecto)
    password: process.env.DB_PASSWORD || "", // Dejar vacío si no hay contraseña configurada en XAMPP
    database: process.env.DB_DATABASE || "booking", // Base de datos 'booking' (puedes cambiar el nombre si lo necesitas)
    host: process.env.DB_HOST || "127.0.0.1", // Dirección local de la base de datos, normalmente es 127.0.0.1
    dialect: "mysql", // Cambiar de 'postgres' a 'mysql' para usar MySQL
    logging: false, // Desactivar el logging si no lo necesitas
  },
  test: {
    username: process.env.DB_USERNAME || "root", // 'root' por defecto en MySQL
    password: process.env.DB_PASSWORD || null, // Si no tienes contraseña, puedes dejarlo como null
    database: process.env.DB_DATABASE || "database_test", // Nombre de la base de datos de prueba
    host: process.env.DB_HOST || "127.0.0.1", // Usar la misma dirección local
    dialect: "mysql", // Cambiar de 'postgres' a 'mysql'
    logging: false, // Desactivar logging
  },
  production: {
    username: process.env.DB_USERNAME, // Utilizar las variables de entorno para producción
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql", // Cambiar de 'postgres' a 'mysql' para producción también
    logging: process.env.DB_LOGGING === "true", // Solo activar el logging si está configurado en las variables de entorno
  },
};
