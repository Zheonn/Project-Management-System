const nodemailer = require('nodemailer');

// Configurar o transporte de e-mail
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'youremail@youremail.com',
      pass: 'your password'
    }
  });


module.exports = app => {
    const send = (req, res) => {
        const { nome, email, assunto, mensagem } = req.body;

        // Cria uma mensagem de e-mail
        const mailOptions = {
            from: 'youremail@youremail.com',
            to: email,
            subject: assunto,
            text: `Olá ${nome},\n\n${mensagem}`
        };

        // Envia o e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erro ao enviar o e-mail');
            } else {
                console.log(`E-mail enviado para ${email}: ${info.response}`);
                res.send('E-mail enviado com sucesso!');
            }
        });

    }


    return { send }
}