"use strict";

var Router = require('express');

var transferRouter = new Router();

var transferController = require('../controller/transferController');

transferRouter.post('/post', transferController.create);
transferRouter.get('/get/:id', transferController.getAllTransfers);
module.exports = transferRouter;