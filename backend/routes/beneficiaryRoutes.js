const express = require("express");
const { registerBeneficiary, getBeneficiaryByCNIC, generateToken,scanToken,updateTokenStatus } = require("../controllers/beneficiaryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.post("/register", authMiddleware, registerBeneficiary); // Register beneficiary
router.get("/:cnic", authMiddleware, getBeneficiaryByCNIC); // Get beneficiary by CNIC
router.post("/generate-token", authMiddleware, generateToken); // Generate token for beneficiary
router.get("/token/:token", authMiddleware, scanToken); // Scan token
router.put("/:token/status", authMiddleware, updateTokenStatus); // Update token status

module.exports = router;
