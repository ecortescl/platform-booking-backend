const express = require("express")
const cors = require("cors");
const { ALLOWED_HOSTS } = require("./config");

const app = express();

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
app.use("/api/calendars", permissionRoutes);
app.use("/api/calendars", permissionsroleRoutes);
app.use("/api/calendars", reviewRoutes);
app.use("/api/calendars", roleRoutes);
app.use("/api/calendars", serviceRoutes);
app.use("/api/calendars", serviceuserRoutes);
app.use("/api/calendars", slotRoutes);
app.use("/api/users", userRoutes);


module.exports = app;