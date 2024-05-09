const router = require("express").Router();
const MainController = require('../controller/main.controller');

router.get("/", MainController.welcome);

router.post('/gif-create', MainController.gif);

module.exports = router;