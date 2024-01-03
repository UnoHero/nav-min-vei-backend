const { Router } = require('express');
const authController = require("../controllers/controller");

const router = Router();

router.get("/user/:id", authController.get_info)

module.exports = router