const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");

// Register a user
router.post("/register", register);

// Login a user
router.post("/login", login);

module.exports = router;
