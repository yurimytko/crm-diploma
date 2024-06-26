"use strict";

var Router = require("express");

var router = new Router();

var jwt = require('../midleware/verifyToken');

var trucksController = require("../controller/trucksController");

router.post("/post", jwt, trucksController.create);
router.get("/gets/:id", jwt, trucksController.getTruck);
router.get("/getsall/:id", trucksController.getTrucks);
router.get("/favget/:id", jwt, trucksController.getFavTruck);
router.get('/get/:id', trucksController.getTruckById);
router.put("/up", jwt, trucksController.upTruk);
router.put("/fav", jwt, trucksController.upTrukFav);
router["delete"]('/delete/:id', trucksController.deleteTruck);
module.exports = router;