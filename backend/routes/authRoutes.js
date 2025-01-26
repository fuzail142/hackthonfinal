const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.post("/register", registerUser); // Register user
router.post("/login", loginUser); // Login user
router.get("/profile", authMiddleware, getUserProfile); // Get user profile

module.exports = router;
