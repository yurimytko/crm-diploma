const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'uri200306@gmail.com', // Замените на вашу почту
            pass: 'pnuq dygx jteg ynom' // Замените на ваш пароль
        }
    });

    // Настройте письмо
    let mailOptions = {
        from: 'uri200306@gmail.com', // Замените на вашу почту
        to: toEmail,
        subject: subject,
        text: text
    };

    // Отправьте письмо
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail