"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = "http://127.0.0.1:8000/api/chart/get";

var getChart = function getChart() {
  return _axios["default"].get(API_URL);
};

var chartService = {
  getChart: getChart
};
var _default = chartService;
exports["default"] = _default;