import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure correct path to your context
import axiosInstance from "../services/axiosInstance";
import * as jwt_decode from "jwt-decode"; // Corrected import
import { Card, CardContent, Typography, TextField, Button, CircularProgress } from "@mui/material";

const Login = () => {
  const { login } = useAuth(); // Hook to access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      setLoading(false); // Stop loading after response

      console.log("Login Response:", response.data);

      const token = response.data.token;
      const decodedToken = jwt_decode(token); // Decode the token to get the role
      const role = decodedToken.role; // Extract the role from the token

      console.log("User Role:", role); // Log the role

      login(response.data); // Proceed with login logic

      if (role !== "Admin" && role !== "Receptionist" && role !== "Staff") {
        setError("Invalid role. Contact the administrator.");
      } else {
        setError("");  // Clear any previous errors
      }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f7fafc" }}>
      <Card variant="outlined" sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Typography variant="body2" color="error" gutterBottom>{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} {/* Display loading spinner */}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
