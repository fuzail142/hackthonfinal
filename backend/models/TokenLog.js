const mongoose = require("mongoose");

const tokenLogSchema = new mongoose.Schema({
    token: { type: String, required: true },
    beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary" },
    department: { type: String, required: true },
    status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TokenLog", tokenLogSchema);
