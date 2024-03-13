const Router = require('express')

const unitRouter = new Router

const unitController = require('../controller/unitsConttroler')

unitRouter.post('/post', unitController.createUnit)
unitRouter.get('/get', unitController.getUnit)


module.exports = unitRouter