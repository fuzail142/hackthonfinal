const Beneficiary = require("../models/Beneficiary");
const TokenLog = require("../models/TokenLog");

// Register Beneficiary
exports.registerBeneficiary = async (req, res) => {
    const { cnic, name, phone, address, purpose } = req.body;

    try {
        const existingBeneficiary = await Beneficiary.findOne({ cnic });
        if (existingBeneficiary) return res.status(400).json({ message: "Beneficiary already registered" });

        const newBeneficiary = new Beneficiary({ cnic, name, phone, address, purpose });
        await newBeneficiary.save();

        res.status(201).json({ message: "Beneficiary registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Beneficiary by CNIC
exports.getBeneficiaryByCNIC = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findOne({ cnic: req.params.cnic });
        if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });

        res.status(200).json(beneficiary);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Generate Token
exports.generateToken = async (req, res) => {
    const { beneficiaryId, department } = req.body;

    try {
        const token = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate random token
        const tokenLog = new TokenLog({ token, beneficiaryId, department });
        await tokenLog.save();

        res.status(201).json({ message: "Token generated", token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get Beneficiary by Token
exports.scanToken = async (req, res) => {
    try {
        const token = req.params.token;
        const tokenLog = await TokenLog.findOne({ token }).populate("beneficiaryId");

        if (!tokenLog) {
            return res.status(404).json({ message: "Token not found" });
        }

        const beneficiary = tokenLog.beneficiaryId;
        res.status(200).json({ tokenLog, beneficiary });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
// Update Token Status
exports.updateTokenStatus = async (req, res) => {
    const { token, status } = req.body;

    try {
        const updatedToken = await TokenLog.findOneAndUpdate(
            { token },
            { status },
            { new: true }
        );

        if (!updatedToken) {
            return res.status(404).json({ message: "Token not found" });
        }

        res.status(200).json({ message: "Token status updated", updatedToken });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
