const Router = require('express')

const transferRouter = new Router

const transferController = require('../controller/transferController')


transferRouter.post('/post', transferController.create)
transferRouter.get('/get/:id', transferController.getAllTransfers)
transferRouter.delete('/delete/:id', transferController.deleteTransfer)

module.exports = transferRouter