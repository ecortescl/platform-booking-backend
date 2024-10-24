const express = require("express")
const cors = require("cors");
const { ALLOWED_HOSTS } = require("./config");

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
const xss = require("xss-clean"); 
const app = express();

app.use(express.json())


// Use xss-clean middleware to sanitize incoming data
app.use(xss()); 

app.use(cors({
    origin: ALLOWED_HOSTS,
    credentials: true,
}))


//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path')

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Docs Booking Node API',
            version: '1.0.0'
        },
        servers: [
            { 
                url: 'http://localhost:4000'
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]

}

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


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



module.exports = app;