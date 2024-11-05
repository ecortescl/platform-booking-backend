// app.js
const express = require("express");
const cors = require("cors");
const { ALLOWED_HOSTS } = require("./config");
const xss = require("xss-clean");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

require("dotenv").config(); // Cargar las variables de entorno

const app = express();

// Importar las rutas
const appointmentRoutes = require("./routes/appointmentRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const commentRoutes = require("./routes/commentRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const permissionsroleRoutes = require("./routes/permissionsroleRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const roleRoutes = require("./routes/roleRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceuserRoutes = require("./routes/serviceuserRoutes");
const slotRoutes = require("./routes/slotRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Use JSON Middleware
app.use(express.json());

// xss-clean - Sanitizar datos de entrada
app.use(xss());

// Cookie Parser - Necesario para CSRF
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.ALLOWED_HOSTS
      ? process.env.ALLOWED_HOSTS.split(",").concat(["https://platform-booking-backend.onrender.com"]) // Agrega Render a la lista de orígenes permitidos
      : ["http://localhost:4000", "https://platform-booking-backend.onrender.com"], // Si no hay ALLOWED_HOSTS, permite localhost y Render por defecto
    credentials: true,
  })
);
// CSRF Protection - Solo habilitado en producción
if (process.env.NODE_ENV === "production") {
  app.use(csrf({ cookie: true }));
  app.use((err, req, res, next) => {
    if(err.code === 'EBADCSRFTOKEN') return res.status(403).json({message: 'Token CSRF inválido'});
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });
}

// Swagger (para documentación)
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Docs Booking Node API",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:4000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

// Usar las rutas
app.use("/api/appointments", appointmentRoutes);
app.use("/api/calendars", calendarRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/permissionsRole", permissionsroleRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/servicesUser", serviceuserRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/users", userRoutes);
app.use("/api/", authRoutes);

module.exports = app;
