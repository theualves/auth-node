const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

router.get("/:id", checkToken, userController.getUser);

module.exports = router;
