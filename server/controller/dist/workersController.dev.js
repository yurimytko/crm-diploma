"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var file = require('../fileService');

var bcrypt = require('bcrypt');

var sendEmail = require('../midleware/sendMail');

var passGenerator = require("../midleware/generatePass");

var workersController =
/*#__PURE__*/
function () {
  function workersController() {
    _classCallCheck(this, workersController);
  }

  _createClass(workersController, [{
    key: "create",
    value: function create(req, res) {
      var _req$body, name, surname, phone, email, role, status, isfavorite, adminId, isFavoriteDefault, picture, defaultStatus, existingEmail, existingPhone, password, hashedPassword, newWorker, emailSubject, emailText;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, name = _req$body.name, surname = _req$body.surname, phone = _req$body.phone, email = _req$body.email, role = _req$body.role, status = _req$body.status, isfavorite = _req$body.isfavorite, adminId = _req$body.adminId;
              isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

              if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
              }

              defaultStatus = status || "Працює"; // Check if the email already exists in the database

              _context.next = 7;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM workers WHERE email = $1", [email]));

            case 7:
              existingEmail = _context.sent;

              if (!(existingEmail.rows.length > 0)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Email is already registered'
              }));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM workers WHERE phone = $1", [phone]));

            case 12:
              existingPhone = _context.sent;

              if (!(existingPhone.rows.length > 0)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Phone number is already registered'
              }));

            case 15:
              password = passGenerator(8);
              _context.next = 18;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 18:
              hashedPassword = _context.sent;
              _context.next = 21;
              return regeneratorRuntime.awrap(db.query("INSERT INTO workers (name, surname, phone, email, role, status, picture, isfavorite, password, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [name, surname, phone, email, role, defaultStatus, picture, isFavoriteDefault, hashedPassword, adminId]));

            case 21:
              newWorker = _context.sent;
              emailSubject = 'Реєстрація  завершена';
              emailText = "\u0414\u044F\u043A\u0443\u0454\u043C\u043E \u0437\u0430 \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044E ".concat(name, " ").concat(surname, "! \u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C: ").concat(password);
              _context.next = 26;
              return regeneratorRuntime.awrap(sendEmail(email, emailSubject, emailText));

            case 26:
              res.json(newWorker.rows);
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
    key: "getWorker",
    value: function getWorker(req, res) {
      var id, workers;
      return regeneratorRuntime.async(function getWorker$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM workers WHERE admin_id = $1", [id]));

            case 4:
              workers = _context2.sent;

              if (!(workers.rows.length === 0)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                error: "Workers not found"
              }));

            case 7:
              res.json(workers.rows);
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              res.status(500).json({
                error: "Internal Server Error"
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 10]]);
    }
  }, {
    key: "getWorkerById",
    value: function getWorkerById(req, res) {
      var id, worker;
      return regeneratorRuntime.async(function getWorkerById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM workers WHERE id = $1", [id]));

            case 4:
              worker = _context3.sent;

              if (!(worker.rows.length === 0)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                error: "Worker not found"
              }));

            case 7:
              res.json(worker.rows[0]);
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              console.error(_context3.t0);
              res.status(500).json({
                error: "Internal Server Error"
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 10]]);
    }
  }, {
    key: "deleteWorker",
    value: function deleteWorker(req, res) {
      var id, delete_worker_query, deletedWorker;
      return regeneratorRuntime.async(function deleteWorker$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id; // Спочатку видаляємо всі записи з таблиці "units", які мають посилання на робітника з ідентифікатором id

              _context4.next = 4;
              return regeneratorRuntime.awrap(db.query("DELETE FROM units WHERE worker_id = $1", [id]));

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(db.query("DELETE FROM workers WHERE id = $1 RETURNING *", [id]));

            case 6:
              delete_worker_query = _context4.sent;
              deletedWorker = delete_worker_query.rows[0];
              res.json(deletedWorker);
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json(_context4.t0);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "upWorker",
    value: function upWorker(req, res) {
      var _req$body2, id, name, surname, phone, email, role, status, isfavorite, isFavoriteDefault, picture, workerup;

      return regeneratorRuntime.async(function upWorker$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, surname = _req$body2.surname, phone = _req$body2.phone, email = _req$body2.email, role = _req$body2.role, status = _req$body2.status, isfavorite = _req$body2.isfavorite;
              isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

              if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(db.query('UPDATE workers SET name = $1, surname = $2, phone = $3, email = $4, role = $5, status = $6, picture = COALESCE($7, picture), isfavorite = $8 WHERE id = $9 RETURNING *', [name, surname, phone, email, role, status, picture, isFavoriteDefault, id]));

            case 6:
              workerup = _context5.sent;
              res.json(workerup.rows);
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              res.status(500).json(_context5.t0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "upFavorite",
    value: function upFavorite(req, res) {
      var _req$body3, id, isfavorite, favUpdate;

      return regeneratorRuntime.async(function upFavorite$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body3 = req.body, id = _req$body3.id, isfavorite = _req$body3.isfavorite;
              _context6.next = 4;
              return regeneratorRuntime.awrap(db.query('UPDATE workers SET isfavorite = $1 WHERE id = $2 RETURNING *', [isfavorite, id]));

            case 4:
              favUpdate = _context6.sent;
              res.json(favUpdate.rows);
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              res.status(500).json(_context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return workersController;
}();

module.exports = new workersController();