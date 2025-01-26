const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
    cnic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    purpose: { type: String, required: true },
});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
