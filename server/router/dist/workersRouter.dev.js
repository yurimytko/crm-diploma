"use strict";

var Router = require('express');

var workerRouter = new Router();

var workersController = require('../controller/workersController');

var jwt = require('../midleware/verifyToken');

workerRouter.post('/post', jwt, workersController.create);
workerRouter.get('/get/:id', jwt, workersController.getWorker);
workerRouter.get('/getone/:id', workersController.getWorkerById);
workerRouter["delete"]('/delete/:id', workersController.deleteWorker);
workerRouter.put('/up', workersController.upWorker);
workerRouter.put('/fav', workersController.upFavorite);
workerRouter.get('/favget/:id', workersController.getFavWorkers);
module.exports = workerRouter;