"use strict";

var nodemailer = require('nodemailer');

function sendEmail(toEmail, subject, text) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'uri200306@gmail.com',
              // Замените на вашу почту
              pass: 'pnuq dygx jteg ynom' // Замените на ваш пароль

            }
          }); // Настройте письмо

          mailOptions = {
            from: 'uri200306@gmail.com',
            // Замените на вашу почту
            to: toEmail,
            subject: subject,
            text: text
          }; // Отправьте письмо

          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = sendEmail;