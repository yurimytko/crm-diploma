const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'uri200306@gmail.com', 
            pass: 'pnuq dygx jteg ynom'
        }
    });

    let mailOptions = {
        from: 'uri200306@gmail.com',
        to: toEmail,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail