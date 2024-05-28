"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = "http://localhost:8000/api/trnsf";

var getTrnsf = function getTrnsf(id) {
  return _axios["default"].get(API_URL + "/get/".concat(id));
};

var trnsfService = {
  getTrnsf: getTrnsf
};
var _default = trnsfService;
exports["default"] = _default;