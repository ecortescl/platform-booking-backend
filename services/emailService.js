// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia según el proveedor que uses (ej. SendGrid)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarCorreoConfirmacion(clienteEmail, detallesCita) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: clienteEmail,
    subject: 'Confirmación de Cita',
    text: `Su cita ha sido confirmada para el ${detallesCita.fecha} a las ${detallesCita.hora}.`,
  };

  await transporter.sendMail(mailOptions);
}

async function enviarCorreoRecordatorio(clienteEmail, detallesCita) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: clienteEmail,
    subject: 'Recordatorio de Cita',
    text: `Recordatorio: tiene una cita programada para el ${detallesCita.fecha} a las ${detallesCita.hora}.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoConfirmacion, enviarCorreoRecordatorio };
