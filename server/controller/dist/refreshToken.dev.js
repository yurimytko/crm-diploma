"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var generateToken = require('../jwtGenerator');

var refreshToken =
/*#__PURE__*/
function () {
  function refreshToken() {
    _classCallCheck(this, refreshToken);
  }

  _createClass(refreshToken, [{
    key: "refresh",
    value: function refresh(req, res) {
      var token;
      return regeneratorRuntime.async(function refresh$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.body.token;

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'Invalid token'
              }));

            case 3:
              jwt.verify(token, "rweqtwqfdsagqrwgfsre87423huiu2u243h932y4b38g28b", function (err, decoded) {
                if (err) {
                  return res.status(401).json({
                    message: 'Invalid token'
                  });
                }

                console.log(decoded); // Вывод содержимого декодированного токена в консоль

                var id = decoded.id;
                var worker_id = decoded.worker_id; // Включаем все данные из старого токена в новый

                var newToken = generateToken(_objectSpread({}, decoded, {
                  id: id,
                  worker_id: worker_id
                })); // Отправка нового токена в ответе

                res.status(200).json({
                  token: newToken
                });
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return refreshToken;
}();

module.exports = new refreshToken();