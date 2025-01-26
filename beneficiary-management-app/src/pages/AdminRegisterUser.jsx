import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, CircularProgress, Card, CardContent, Typography } from "@mui/material";

const AdminRegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Receptionist", // Default role
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      setSuccessMessage(response.data.message);
      setFormData({ name: "", email: "", password: "", role: "Receptionist" });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin - Register User
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New User
          </Typography>

          {successMessage && <Typography variant="body1" color="success.main" gutterBottom>{successMessage}</Typography>}
          {errorMessage && <Typography variant="body1" color="error.main" gutterBottom>{errorMessage}</Typography>}
          
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                variant="outlined"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Receptionist">Receptionist</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
              <FormHelperText>Select user role</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ marginTop: "16px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Register User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegisterUser;
