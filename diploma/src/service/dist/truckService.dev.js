"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URl = 'http://localhost:8000/api/truck';

var postTrucks = function postTrucks(brand, model, license, picture, fuel_type, adminId) {
  return _axios["default"].post(API_URl + '/post', {
    brand: brand,
    model: model,
    license: license,
    picture: picture,
    fuel_type: fuel_type,
    adminId: adminId
  }, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      "Authorization": JSON.parse(localStorage.getItem('token')).token
    }
  });
};

var getTrucks = function getTrucks(id, page) {
  return _axios["default"].get(API_URl + "/gets/".concat(id, "?page=").concat(page, "&limit=8"), {
    headers: {
      "Content-Type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('token')).token
    }
  });
};

var getTrucksById = function getTrucksById(id) {
  return _axios["default"].get(API_URl + "/get/" + id);
};

var deleteTruck = function deleteTruck(id) {
  return _axios["default"]["delete"]("".concat(API_URl, "/delete/").concat(id));
};

var favTruckUp = function favTruckUp(id, isfavorite) {
  return _axios["default"].put(API_URl + '/fav', {
    id: id,
    isfavorite: isfavorite
  }, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      "Authorization": JSON.parse(localStorage.getItem('token')).token
    }
  });
};

var truckUp = function truckUp(id, brand, model, license, picture, fuel_type) {
  return _axios["default"].put(API_URl + '/up', {
    id: id,
    brand: brand,
    model: model,
    license: license,
    picture: picture,
    fuel_type: fuel_type
  }, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
      "Authorization": JSON.parse(localStorage.getItem('token')).token
    }
  });
};

var truckServices = {
  getTrucks: getTrucks,
  getTrucksById: getTrucksById,
  deleteTruck: deleteTruck,
  postTrucks: postTrucks,
  favTruckUp: favTruckUp,
  truckUp: truckUp
};
var _default = truckServices;
exports["default"] = _default;