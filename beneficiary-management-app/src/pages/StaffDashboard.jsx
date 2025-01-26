import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";

const StaffDashboard = () => {
  const [token, setToken] = useState("");
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScanToken = async (e) => {
    e.preventDefault();
    setBeneficiaryData(null);
    setErrorMessage("");
    setStatusMessage("");
    try {
      const response = await axiosInstance.get(`/beneficiary/token/${token}`);
      setBeneficiaryData(response.data);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Token not found");
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const response = await axiosInstance.put("/beneficiary/token/status", {
        token,
        status: newStatus,
      });
      setStatusMessage(response.data.message);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f7fafc" }}>
      <Card variant="outlined" sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Staff Dashboard
          </Typography>

          <form onSubmit={handleScanToken}>
            <Typography variant="h6" gutterBottom>
              Scan Token
            </Typography>
            {errorMessage && <Typography variant="body2" color="error.main" gutterBottom>{errorMessage}</Typography>}
            
            <TextField
              label="Enter Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
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
              Scan
            </Button>
          </form>

          {beneficiaryData && (
            <div style={{ marginTop: "2rem" }}>
              <Typography variant="h6" gutterBottom>
                Beneficiary Details
              </Typography>
              <Typography variant="body1" gutterBottom><strong>CNIC:</strong> {beneficiaryData.beneficiary.cnic}</Typography>
              <Typography variant="body1" gutterBottom><strong>Name:</strong> {beneficiaryData.beneficiary.name}</Typography>
              <Typography variant="body1" gutterBottom><strong>Phone:</strong> {beneficiaryData.beneficiary.phone}</Typography>
              <Typography variant="body1" gutterBottom><strong>Address:</strong> {beneficiaryData.beneficiary.address}</Typography>
              <Typography variant="body1" gutterBottom><strong>Purpose:</strong> {beneficiaryData.beneficiary.purpose}</Typography>

              <div style={{ marginTop: "1rem" }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleUpdateStatus("In Progress")}
                  sx={{ marginRight: 2 }}
                >
                  Mark as In Progress
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateStatus("Completed")}
                >
                  Mark as Completed
                </Button>
              </div>

              {statusMessage && <Typography variant="body2" color="success.main" sx={{ marginTop: 2 }}>{statusMessage}</Typography>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
