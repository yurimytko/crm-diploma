const Router = require('express')

const adminRouter = new Router

const adminController = require("../controller/ownerController")

adminRouter.post("/post", adminController.create)
adminRouter.get("/get", adminController.getAdmin)

module.exports = adminRouter
