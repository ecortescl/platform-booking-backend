// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
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
console.log(mailOptions.to)
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

async function enviarNotificacionMensaje(client) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: client.email,
    subject: 'Notificación de Mensaje',
    text: `Hola ${client.names + ' ' + client.surnames}, tienes mensajer por leer`,
  });
}

module.exports = { enviarCorreoConfirmacion, enviarCorreoRecordatorio, enviarNotificacionMensaje };
