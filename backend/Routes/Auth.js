const express = require("express");
const router = express.Router();

const UserControllers = require("../Controllers/Auth.js");

router.post("/login", UserControllers.getUser);

router.post("/signup", UserControllers.createUser);

module.exports = router;