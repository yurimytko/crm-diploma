"use strict";

var Router = require('express');

var adminRouter = new Router();

var adminController = require("../controller/ownerController");

adminRouter.post("/post", adminController.create);
adminRouter.get("/get", adminController.getAdmin);
module.exports = adminRouter;