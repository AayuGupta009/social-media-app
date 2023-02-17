const express = require("express");
const router = express.Router();

const userController = require("../controllers/User.js");

router.get("/profile", userController.getAll);
router.post("/login", userController.generateToken);
router.post("/register", userController.generateToken);
router.get("/login", (req, res) => res.send("Login Page"));
router.get("/register", (req, res) => res.send("Register Page"));

module.exports = router;
