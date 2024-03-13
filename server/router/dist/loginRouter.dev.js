"use strict";

var Router = require('express');

var loginRout = new Router();

var loginController = require('../controller/loginController');

loginRout.post('/login', loginController.login);
module.exports = loginRout;