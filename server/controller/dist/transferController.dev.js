"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var transferController =
/*#__PURE__*/
function () {
  function transferController() {
    _classCallCheck(this, transferController);
  }

  _createClass(transferController, [{
    key: "create",
    value: function create(req, res) {
      var _req$body, truck_id, worker_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time, transfer;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, truck_id = _req$body.truck_id, worker_id = _req$body.worker_id, client_name = _req$body.client_name, client_company = _req$body.client_company, client_phone = _req$body.client_phone, client_email = _req$body.client_email, cargo = _req$body.cargo, cargo_weight = _req$body.cargo_weight, from_address = _req$body.from_address, to_address = _req$body.to_address, dispatch_time = _req$body.dispatch_time;
              _context.next = 4;
              return regeneratorRuntime.awrap(db.query("INSERT INTO transfers (truck_id, worker_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)  RETURNING *", [truck_id, worker_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time]));

            case 4:
              transfer = _context.sent;
              res.json(transfer);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
              res.status(500).json(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return transferController;
}();

module.exports = new transferController();