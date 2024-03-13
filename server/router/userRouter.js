const Router = require("express")

const router = new Router()

const jwt = require('../midleware/verifyToken')

const trucksController = require("../controller/userController")

router.post("/post", jwt, trucksController.create)
router.get("/gets/:id", jwt,  trucksController.getTruck)
router.get('/get/:id', trucksController.getTruckById)
router.put("/up", jwt, trucksController.upTruk)
router.put("/fav", jwt,trucksController.upTrukFav)

router.delete('/delete/:id', trucksController.deleteTruck)





module.exports = router