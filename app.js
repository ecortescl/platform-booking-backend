const express = require("express")
const cors = require("cors");
const { ALLOWED_HOSTS } = require("./config");

const app = express();
const { authenticateToken } = require('./middleware/authMiddleware'); // Importar el middleware de autenticación
const { verifyRole } = require('./middleware/roleMiddleware'); // Importar el middleware de verificación de roles

app.use(express.json())

app.use(cors({
    origin: ALLOWED_HOSTS,
    credentials: true,
}))


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



// Usar las rutas
app.use("/api/appointments", appointmentRoutes);
app.use("/api/calendars", calendarRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/permissionsrole", permissionsroleRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/serviceuser", serviceuserRoutes);
app.use("/api/slot", slotRoutes);
app.use("/api/user", userRoutes);

// Uso del middleware para proteger rutas
app.get('/admin', authenticateToken, verifyRole('administrador'), (req, res) => {
    res.send('Bienvenido al panel de administración.'); // Mensaje para administradores
  });

app.get('/profesional/dashboard', authenticateToken, verifyRole('profesional'), (req, res) => {
    res.send('Panel de control del profesional.'); // Mensaje para profesionales
  });

app.get('/cliente/reservar', authenticateToken, verifyRole('cliente'), (req, res) => {
    res.send('Funcionalidad de reserva de citas.'); // Mensaje para clientes
  });

module.exports = app;