"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var untitController =
/*#__PURE__*/
function () {
  function untitController() {
    _classCallCheck(this, untitController);
  }

  _createClass(untitController, [{
    key: "createUnit",
    value: function createUnit(req, res) {
      var _req$body, truck_id, worker_id, existingTruckUnit, existingWorkerUnit, newUnit;

      return regeneratorRuntime.async(function createUnit$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, truck_id = _req$body.truck_id, worker_id = _req$body.worker_id;
              _context.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM units WHERE truck_id = $1", [truck_id]));

            case 4:
              existingTruckUnit = _context.sent;

              if (!(existingTruckUnit.rows.length > 0)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: "Вантажівка вже призначена іншому unit."
              }));

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM units WHERE worker_id = $1", [worker_id]));

            case 9:
              existingWorkerUnit = _context.sent;

              if (!(existingWorkerUnit.rows.length > 0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: "Робітник вже призначений іншому unit."
              }));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(db.query("INSERT INTO units (truck_id, worker_id) VALUES ($1, $2) RETURNING *", [truck_id, worker_id]));

            case 14:
              newUnit = _context.sent;
              res.json(newUnit.rows);
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              res.status(500).json(_context.t0);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "getUnit",
    value: function getUnit(req, res) {
      var unit, formattedResponse;
      return regeneratorRuntime.async(function getUnit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(db.query("SELECT units.id, trucks.id AS truck_id, trucks.brand AS truck_brand, trucks.model AS truck_model, trucks.license AS truck_license, workers.id AS worker_id, workers.name AS worker_name, workers.surname AS worker_surname, workers.phone AS worker_phone FROM units JOIN trucks ON units.truck_id = trucks.id JOIN workers ON units.worker_id = workers.id"));

            case 3:
              unit = _context2.sent;
              formattedResponse = unit.rows.map(function (row) {
                return {
                  id: row.id,
                  truck: {
                    id: row.truck_id,
                    brand: row.truck_brand,
                    model: row.truck_model,
                    license: row.truck_license
                  },
                  worker: {
                    id: row.worker_id,
                    name: row.worker_name,
                    surname: row.worker_surname,
                    phone: row.worker_phone
                  }
                };
              });
              res.json(formattedResponse);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return untitController;
}();

module.exports = new untitController();