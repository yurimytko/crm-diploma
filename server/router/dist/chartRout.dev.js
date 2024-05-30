"use strict";

var Router = require("express");

var chartsRouter = new Router();

var chartController = require("../controller/chartController");

chartsRouter.get('/get', chartController.getChart);
module.exports = chartsRouter;