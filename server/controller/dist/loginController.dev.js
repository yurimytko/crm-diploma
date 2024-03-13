"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var bcrypt = require('bcryptjs');

var generateToken = require('../jwtGenerator');

var LoginController =
/*#__PURE__*/
function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, [{
    key: "login",
    value: function login(req, res) {
      var _req$body, email, password, queryResult, user, validPass, token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password; // Перевірка користувача в таблиці "workers"

              _context.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM workers WHERE email = $1", [email]));

            case 4:
              queryResult = _context.sent;
              user = queryResult.rows[0]; // Якщо користувач не знайдений в таблиці "workers", перевіряємо таблицю "admins"

              if (user) {
                _context.next = 11;
                break;
              }

              _context.next = 9;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM admins WHERE email = $1", [email]));

            case 9:
              queryResult = _context.sent;
              user = queryResult.rows[0];

            case 11:
              if (user) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).send('Email or password is wrong'));

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 15:
              validPass = _context.sent;

              if (validPass) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).send('Invalid password'));

            case 18:
              // Генерація токена доступу
              token = generateToken(user);
              res.status(200).json({
                token: token
              });
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              res.status(500).send('Internal Server Error');

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 22]]);
    }
  }]);

  return LoginController;
}();

module.exports = new LoginController();