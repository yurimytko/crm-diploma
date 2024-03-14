"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = "http://localhost:8000/api/auth";

var login = function login(email, password) {
  return _axios["default"].post(API_URL + "/login", {
    email: email,
    password: password
  }).then(function (response) {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data));
    }

    return response.data;
  });
};

var loginService = {
  login: login
};
var _default = loginService;
exports["default"] = _default;