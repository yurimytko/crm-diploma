"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db');

var ChartController =
/*#__PURE__*/
function () {
  function ChartController() {
    _classCallCheck(this, ChartController);
  }

  _createClass(ChartController, [{
    key: "getChart",
    value: function getChart(req, res) {
      var charts;
      return regeneratorRuntime.async(function getChart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(db.query("SELECT * FROM current_year"));

            case 3:
              charts = _context.sent;
              res.json(charts.rows);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                error: "Internal Server Error"
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return ChartController;
}();

module.exports = new ChartController();