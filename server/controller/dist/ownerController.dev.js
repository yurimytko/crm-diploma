"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var file = require('../fileService');

var bcrypt = require('bcrypt');

var sendEmail = require('../midleware/sendMail');

var OwnerController =
/*#__PURE__*/
function () {
  function OwnerController() {
    _classCallCheck(this, OwnerController);
  }

  _createClass(OwnerController, [{
    key: "create",
    value: function create(req, res) {
      var _req$body, name, surname, phone, email, role, status, isfavorite, password, isFavoriteDefault, picture, defaultStatus, defaultRole, existingEmail, existingPhone, hashedPassword, newAdmin, emailSubject, emailText;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, name = _req$body.name, surname = _req$body.surname, phone = _req$body.phone, email = _req$body.email, role = _req$body.role, status = _req$body.status, isfavorite = _req$body.isfavorite, password = _req$body.password;
              isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

              if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
              }

              defaultStatus = status || "Працює";
              defaultRole = role || "Власник"; // Додано умову для встановлення ролі за замовчуванням
              // Check if the email already exists in the database

              _context.next = 8;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM admins WHERE email = $1", [email]));

            case 8:
              existingEmail = _context.sent;

              if (!(existingEmail.rows.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Email is already registered'
              }));

            case 11:
              _context.next = 13;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM admins WHERE phone = $1", [phone]));

            case 13:
              existingPhone = _context.sent;

              if (!(existingPhone.rows.length > 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Phone number is already registered'
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 18:
              hashedPassword = _context.sent;
              _context.next = 21;
              return regeneratorRuntime.awrap(db.query("INSERT INTO admins (name, surname, phone, email, role, status, picture, isfavorite, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [name, surname, phone, email, defaultRole, defaultStatus, picture, isFavoriteDefault, hashedPassword] // Використано defaultRole
              ));

            case 21:
              newAdmin = _context.sent;
              emailSubject = 'Регистрация завершена';
              emailText = "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E ".concat(name, " ").concat(surname, "! \u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C: ").concat(password);
              _context.next = 26;
              return regeneratorRuntime.awrap(sendEmail(email, emailSubject, emailText));

            case 26:
              res.json(newAdmin.rows);
              _context.next = 33;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              res.status(500).json(_context.t0);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 29]]);
    }
  }, {
    key: "getAdmin",
    value: function getAdmin(req, res) {
      var worker;
      return regeneratorRuntime.async(function getAdmin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM admins"));

            case 3:
              worker = _context2.sent;
              res.json(worker.rows);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json(_context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return OwnerController;
}();

module.exports = new OwnerController();