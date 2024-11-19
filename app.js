// app.js
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
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

//Importar módulo WebSocket, http para mensajería interna
const WebSocket = require('ws')

//Importar método handleConnection para mensajería interna
const handleConnection = require("./controllers/chat-ws-controller");

//#USO DE VARIABLES

// Use JSON Middleware
app.use(express.json());

// xss-clean - Sanitizar datos de entrada
app.use(xss());




// CORS
app.use(
  cors({
    origin: process.env.ALLOWED_HOSTS
      ? process.env.ALLOWED_HOSTS.split(",")
      : ["http://localhost:4000", "http://localhost:5173"], // Se agrega localhost:5173
      origin: "*", // Permite cualquier origen
      credentials: true, // No se permiten credenciales (puedes cambiar a true si las necesitas)
  })
);





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
    security: [
      {
        BearerAuth: [],
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

//Configuración Mensajería (WEBSOCKET)
const wss = new WebSocket.Server({port: 8080});

const sockets = new Map();
const notCli = new Set();

wss.on('connection', (ws) => {
  handleConnection(ws, sockets, notCli);
});

module.exports = app;
