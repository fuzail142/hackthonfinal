import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axiosInstance.get("/admin/metrics");
        setMetrics(response.data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Link to Register New User */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/register">
          <Button variant="contained" color="primary">
            Register New User
          </Button>
        </Link>
      </div>

      {/* Metrics Section */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Metrics Overview
          </Typography>
          {metrics ? (
            <ul>
              <li>
                <Typography variant="body1">
                  Total Beneficiaries: {metrics.totalBeneficiaries}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  New Beneficiaries: {metrics.newBeneficiaries}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Returning Beneficiaries: {metrics.returningBeneficiaries}
                </Typography>
              </li>
            </ul>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
