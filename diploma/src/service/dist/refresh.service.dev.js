"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URl = 'http://localhost:8000/api/ref';

var refresh = function refresh(token) {
  return _axios["default"].post(API_URl + '/post', {
    token: token
  }).then(function (response) {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data));
    }

    return response.data;
  });
};

var refreshToken = {
  refresh: refresh
};
var _default = refreshToken;
exports["default"] = _default;