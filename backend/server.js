const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Enable CORS with specific origin
const corsOptions = {
  origin: 'https://beneficiary-management-bzzoov8zv-fuzail142s-projects.vercel.app',  // Your frontend URL
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Apply the CORS middleware with options
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/beneficiary", require("./routes/beneficiaryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
