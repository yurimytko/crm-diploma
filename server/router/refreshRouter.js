const Router = require('express')

const refreshRouter = new Router

const refController = require('../controller/refreshToken')


refreshRouter.post("/post", refController.refresh)

module.exports = refreshRouter