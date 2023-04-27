const nodemailer = require('nodemailer');

// Configurar o transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'youremail@youremail.com',
      pass: 'yourpassword'
    }
  });

  module.exports = transporter