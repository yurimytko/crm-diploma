"use strict";

var Router = require('express');

var refreshRouter = new Router();

var refController = require('../controller/refreshToken');

refreshRouter.post("/post", refController.refresh);
module.exports = refreshRouter;