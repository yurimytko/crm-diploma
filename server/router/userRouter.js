const Router = require("express")

const router = new Router()

const jwt = require('../midleware/verifyToken')

const trucksController = require("../controller/trucksController")

router.post("/post", jwt, trucksController.create)
router.get("/gets/:id", jwt,  trucksController.getTruck)
router.get("/getsall/:id", trucksController.getTrucks)
router.get("/favget/:id", jwt,trucksController.getFavTruck)

router.get('/get/:id', trucksController.getTruckById)
router.put("/up", jwt, trucksController.upTruk)
router.put("/fav", jwt,trucksController.upTrukFav)

router.delete('/delete/:id', trucksController.deleteTruck)





module.exports = router