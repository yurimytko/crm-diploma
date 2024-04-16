"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      var _req$body, truck_id, worker_id, admin_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time, transfer;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, truck_id = _req$body.truck_id, worker_id = _req$body.worker_id, admin_id = _req$body.admin_id, client_name = _req$body.client_name, client_company = _req$body.client_company, client_phone = _req$body.client_phone, client_email = _req$body.client_email, cargo = _req$body.cargo, cargo_weight = _req$body.cargo_weight, from_address = _req$body.from_address, to_address = _req$body.to_address, dispatch_time = _req$body.dispatch_time;
              _context.next = 4;
              return regeneratorRuntime.awrap(db.query("INSERT INTO transfers (truck_id, worker_id, admin_id, client_name,client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)  RETURNING *", [truck_id, worker_id, admin_id, client_name, client_company, client_phone, client_email, cargo, cargo_weight, from_address, to_address, dispatch_time]));

            case 4:
              transfer = _context.sent;
              res.json(transfer.rows);
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
  }, {
    key: "getAllTransfers",
    value: function getAllTransfers(req, res) {
      var id, transfers, formattedTransfers, updateStatusQuery;
      return regeneratorRuntime.async(function getAllTransfers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT transfers.*, workers.id AS worker_id, workers.name AS worker_name, workers.phone AS worker_phone, workers.picture AS worker_picture, trucks.id AS truck_id,trucks.brand AS truck_brand, trucks.model AS truck_model, trucks.license AS truck_license FROM transfers JOIN workers ON transfers.worker_id = workers.id JOIN trucks ON transfers.truck_id = trucks.id WHERE transfers.admin_id = $1", [id]));

            case 4:
              transfers = _context2.sent;
              formattedTransfers = transfers.rows.map(function (transfer) {
                var worker_id = transfer.worker_id,
                    worker_name = transfer.worker_name,
                    worker_phone = transfer.worker_phone,
                    worker_picture = transfer.worker_picture,
                    truck_id = transfer.truck_id,
                    truck_brand = transfer.truck_brand,
                    truck_model = transfer.truck_model,
                    truck_license = transfer.truck_license,
                    rest = _objectWithoutProperties(transfer, ["worker_id", "worker_name", "worker_phone", "worker_picture", "truck_id", "truck_brand", "truck_model", "truck_license"]);

                return _objectSpread({}, rest, {
                  driver: {
                    id: worker_id,
                    name: worker_name,
                    phone: worker_phone,
                    picture: worker_picture
                  },
                  truck: {
                    id: truck_id,
                    brand: truck_brand,
                    model: truck_model,
                    license: truck_license
                  }
                });
              });
              updateStatusQuery = "UPDATE trucks SET status = 'В рейсі' WHERE id IN (SELECT truck_id FROM transfers WHERE admin_id = $1)";
              _context2.next = 9;
              return regeneratorRuntime.awrap(db.query(updateStatusQuery, [id]));

            case 9:
              res.json(formattedTransfers);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }
  }]);

  return transferController;
}();

module.exports = new transferController();