const Beneficiary = require("../models/Beneficiary");
const TokenLog = require("../models/TokenLog");

// Get Admin Metrics
exports.getAdminMetrics = async (req, res) => {
    try {
        // Get total beneficiaries
        const totalBeneficiaries = await Beneficiary.countDocuments();

        // Calculate new and returning beneficiaries
        const newBeneficiaries = await Beneficiary.find({
            createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } 
        }).countDocuments();
        const returningBeneficiaries = totalBeneficiaries - newBeneficiaries;

        // Respond with the metrics
        res.status(200).json({
            totalBeneficiaries,
            newBeneficiaries,
            returningBeneficiaries,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Search Beneficiaries
exports.searchBeneficiaries = async (req, res) => {
    const { query } = req.query;
    try {
        const beneficiaries = await Beneficiary.find({
            $or: [
                { cnic: { $regex: query, $options: "i" } },
                { name: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
            ],
        });

        res.status(200).json(beneficiaries);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
