const Router = require("express")

const chartsRouter = new Router

const chartController = require("../controller/chartController")

chartsRouter.get('/get', chartController.getChart)

module.exports = chartsRouter