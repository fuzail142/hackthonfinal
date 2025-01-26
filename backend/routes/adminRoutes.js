const express = require("express");
const { getAdminMetrics, searchBeneficiaries } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin role required for these routes
router.get("/metrics", authMiddleware, roleMiddleware("Admin"), getAdminMetrics);
router.get("/beneficiaries/search", authMiddleware, roleMiddleware("Admin"), searchBeneficiaries);

module.exports = router;
