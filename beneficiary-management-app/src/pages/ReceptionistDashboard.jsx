import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";

const ReceptionistDashboard = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axiosInstance.post("/beneficiary/register", formData);
      setSuccessMessage(response.data.message);
      setFormData({ cnic: "", name: "", phone: "", address: "", purpose: "" });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error registering beneficiary");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f7fafc" }}>
      <Card variant="outlined" sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Receptionist Dashboard
          </Typography>
          <form onSubmit={handleRegister}>
            <Typography variant="h6" gutterBottom>
              Register Beneficiary
            </Typography>
            {successMessage && <Typography variant="body2" color="success.main" gutterBottom>{successMessage}</Typography>}
            {errorMessage && <Typography variant="body2" color="error.main" gutterBottom>{errorMessage}</Typography>}

            <TextField
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
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
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
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
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistDashboard;
