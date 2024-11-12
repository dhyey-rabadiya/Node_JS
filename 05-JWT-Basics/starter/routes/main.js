const express = require("express");
const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Login route
router.route("/login").post(login);

// Dashboard route
// This route will first pass through the auth-middleware and then after the success of the auth middleware it will move to the further process
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
