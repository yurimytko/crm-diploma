const Router = require('express')

const workerRouter = new Router

const workersController = require('../controller/workersController')

const jwt = require('../midleware/verifyToken')

workerRouter.post('/post', jwt,workersController.create)
workerRouter.get('/get/:id', jwt ,workersController.getWorker)
workerRouter.get('/get', workersController.getWorkerById)
workerRouter.delete('/delete/:id', workersController.deleteWorker)
workerRouter.put('/up', workersController.upWorker)
workerRouter.put('/fav', workersController.upFavorite)



module.exports = workerRouter