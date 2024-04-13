"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var file = require("../fileService");

var trucksController =
/*#__PURE__*/
function () {
  function trucksController() {
    _classCallCheck(this, trucksController);
  }

  _createClass(trucksController, [{
    key: "create",
    value: function create(req, res) {
      var _req$body, brand, model, license, status, isfavorite, fuel_type, adminId, isFavoriteDefault, picture, defaultStatus, newTruck;

      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, brand = _req$body.brand, model = _req$body.model, license = _req$body.license, status = _req$body.status, isfavorite = _req$body.isfavorite, fuel_type = _req$body.fuel_type, adminId = _req$body.adminId;
              isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

              if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
              }

              defaultStatus = status || "Доступний";
              _context.next = 7;
              return regeneratorRuntime.awrap(db.query("INSERT INTO trucks (brand, model, license, status, isfavorite, picture, fuel_type, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [brand, model, license, defaultStatus, isFavoriteDefault, picture, fuel_type, adminId]));

            case 7:
              newTruck = _context.sent;
              res.json(newTruck.rows);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              res.status(500).json(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "getTruckById",
    value: function getTruckById(req, res) {
      var id, truck;
      return regeneratorRuntime.async(function getTruckById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.id;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM trucks WHERE id = $1", [id]));

            case 4:
              truck = _context2.sent;

              if (!(truck.rows.length === 0)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                error: "Truck not found"
              }));

            case 7:
              res.json(truck.rows[0]);
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
    key: "getTrucks",
    value: function getTrucks(req, res) {
      var id, truck;
      return regeneratorRuntime.async(function getTrucks$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM trucks WHERE admin_id = $1", [id]));

            case 4:
              truck = _context3.sent;
              res.json(truck.rows);
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              res.status(500).json({
                error: "Internal Server Error"
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }, {
    key: "getTruck",
    value: function getTruck(req, res) {
      var id, _req$query, _req$query$page, page, _req$query$limit, limit, offset, truck, totalCount, totalPages;

      return regeneratorRuntime.async(function getTruck$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = req.params.id;
              _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 8 : _req$query$limit; // Зчитування параметрів сторінки та ліміту

              _context4.prev = 2;
              offset = (page - 1) * limit; // Вирахування зміщення для запиту

              _context4.next = 6;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM trucks WHERE admin_id = $1 ORDER BY id LIMIT $2 OFFSET $3", [id, limit, offset]));

            case 6:
              truck = _context4.sent;

              if (!(truck.rows.length === 0)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                error: "Truck not found"
              }));

            case 9:
              _context4.next = 11;
              return regeneratorRuntime.awrap(db.query("SELECT COUNT(*) FROM trucks WHERE admin_id = $1", [id]));

            case 11:
              totalCount = _context4.sent;
              // Запит для підрахунку загальної кількості записів
              totalPages = Math.ceil(totalCount.rows[0].count / limit); // Обчислення загальної кількості сторінок

              res.json({
                data: truck.rows,
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount.rows[0].count,
                totalPages: totalPages
              });
              _context4.next = 20;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](2);
              console.error(_context4.t0);
              res.status(500).json({
                error: "Internal Server Error"
              });

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[2, 16]]);
    }
  }, {
    key: "upTruk",
    value: function upTruk(req, res) {
      var _req$body2, id, brand, model, license, status, isfavorite, fuel_type, isFavoriteDefault, picture, truckup;

      return regeneratorRuntime.async(function upTruk$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body2 = req.body, id = _req$body2.id, brand = _req$body2.brand, model = _req$body2.model, license = _req$body2.license, status = _req$body2.status, isfavorite = _req$body2.isfavorite, fuel_type = _req$body2.fuel_type;
              isFavoriteDefault = isfavorite !== undefined ? isfavorite : false;

              if (req.files && req.files.picture) {
                picture = file.SaveFile(req.files.picture);
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(db.query('UPDATE trucks SET brand = $1, model = $2, license = $3, status = $4, isfavorite = $5, picture = COALESCE($6, picture), fuel_type = $7 WHERE id = $8 RETURNING *', [brand, model, license, status, isFavoriteDefault, picture, fuel_type, id]));

            case 6:
              truckup = _context5.sent;
              res.json(truckup.rows);
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
    key: "upTrukFav",
    value: function upTrukFav(req, res) {
      var _req$body3, isfavorite, id, truckup;

      return regeneratorRuntime.async(function upTrukFav$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body3 = req.body, isfavorite = _req$body3.isfavorite, id = _req$body3.id;
              _context6.next = 4;
              return regeneratorRuntime.awrap(db.query('UPDATE trucks SET isfavorite = $1 WHERE id = $2 RETURNING *', [isfavorite, id]));

            case 4:
              truckup = _context6.sent;
              res.json(truckup.rows);
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
  }, {
    key: "deleteTruck",
    value: function deleteTruck(req, res) {
      var id, delete_truck_query, deletedTruck;
      return regeneratorRuntime.async(function deleteTruck$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              id = req.params.id; // Спочатку видаляємо всі записи в таблиці "units", які мають зовнішній ключ, що посилається на вантажівку

              _context7.next = 4;
              return regeneratorRuntime.awrap(db.query("DELETE FROM units WHERE truck_id = $1", [id]));

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(db.query("DELETE FROM trucks WHERE id = $1 RETURNING *", [id]));

            case 6:
              delete_truck_query = _context7.sent;
              deletedTruck = delete_truck_query.rows[0];
              res.json(deletedTruck);
              _context7.next = 14;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              res.status(500).json(_context7.t0);

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "getFavTruck",
    value: function getFavTruck(req, res) {
      var id, trucks;
      return regeneratorRuntime.async(function getFavTruck$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              id = req.params.id;
              _context8.next = 4;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM trucks WHERE admin_id = $1 AND isfavorite = true", [id]));

            case 4:
              trucks = _context8.sent;
              res.json(trucks.rows);
              _context8.next = 11;
              break;

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              res.status(500).json(e);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return trucksController;
}();

module.exports = new trucksController();