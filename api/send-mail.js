const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Solo se permiten peticiones POST' });
  }

  const { nombre, email, servicio, telefono, mensaje } = req.body;

  // 1. Configurar el transportador con tus credenciales
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joaquinflores2207@gmail.com',
      pass: 'process.env.EMAIL_PASS' 
    }
  });

  try {
    // 2. Definir el contenido del correo
    await transporter.sendMail({
      // Nombre que aparecerá en la bandeja de entrada
      from: '"Estudio Flores - Sistema" <joaquinflores2207@gmail.com>', 
      to: 'joaquinflores2207@gmail.com',
      
      // EL TÍTULO QUE QUERÍAS:
      subject: `Oferta Laboral - Web: ${nombre}`, 
      
      // Para que al dar "Responder" le escribas al cliente
      replyTo: email, 
      
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #000; color: #fff;">
          <h2 style="color: #6366f1;">Nuevo Proyecto Recibido 🚀</h2>
          <p><strong>Cliente:</strong> ${nombre}</p>
          <p><strong>Servicio solicitado:</strong> ${servicio}</p>
          <p><strong>WhatsApp:</strong> ${telefono}</p>
          <p><strong>Mensaje:</strong> ${mensaje}</p>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
