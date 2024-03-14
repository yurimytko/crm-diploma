"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = 'http://localhost:8000/api/worker';

var getWorkers = function getWorkers(id) {
  return _axios["default"].get(API_URL + "/get/".concat(id), {
    headers: {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('token')).token
    }
  });
};

var deleteWorker = function deleteWorker(id) {
  return _axios["default"]["delete"]("".concat(API_URL, "/delete/").concat(id));
};

var workerUpdate = function workerUpdate(id, name, surname, phone, email, role, status, picture, isfavorite) {
  return _axios["default"].put(API_URL + '/up', {
    id: id,
    name: name,
    surname: surname,
    phone: phone,
    email: email,
    role: role,
    status: status,
    picture: picture,
    isfavorite: isfavorite
  }, {
    header: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data'
    }
  });
};

var favWorkerUp = function favWorkerUp(id, isfavorite) {
  return _axios["default"].put(API_URL + '/fav', {
    id: id,
    isfavorite: isfavorite
  });
};

var workerService = {
  getWorkers: getWorkers,
  deleteWorker: deleteWorker,
  workerUpdate: workerUpdate,
  favWorkerUp: favWorkerUp
};
var _default = workerService;
exports["default"] = _default;