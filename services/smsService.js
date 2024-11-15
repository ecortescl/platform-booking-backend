// services/smsService.js
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function enviarSmsConfirmacion(clienteTelefono, detallesCita) {
  await client.messages.create({
    body: `Su cita ha sido confirmada para el ${detallesCita.fecha} a las ${detallesCita.hora}.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: clienteTelefono,
  });

  console.log(clienteTelefono)
}

async function enviarSmsRecordatorio(clienteTelefono, detallesCita) {
  await client.messages.create({
    body: `Recordatorio: tiene una cita programada para el ${detallesCita.fecha} a las ${detallesCita.hora}.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: clienteTelefono,
  });
}

module.exports = { enviarSmsConfirmacion, enviarSmsRecordatorio };
