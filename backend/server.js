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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allows cookies or other credentials to be sent with requests
};

// Apply the CORS middleware with options
app.use(cors(corsOptions));  
app.use(express.json());

// Handle preflight request (OPTIONS)
app.options('*', cors(corsOptions));  // Allow preflight request from all routes

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/beneficiary", require("./routes/beneficiaryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
