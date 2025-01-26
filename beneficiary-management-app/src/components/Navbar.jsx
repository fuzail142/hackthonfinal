import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Assuming `useAuth` provides `user` and `logout`
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          Beneficiary Management
        </Typography>

        {/* Links based on Role */}
        {user?.role === "Admin" && (
          <>
            <Button color="inherit" component={Link} to="/admin">
              Admin Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/admin/register">
              Register User
            </Button>
          </>
        )}
        {user?.role === "Receptionist" && (
          <Button color="inherit" component={Link} to="/receptionist">
            Receptionist Dashboard
          </Button>
        )}
        {user?.role === "Staff" && (
          <Button color="inherit" component={Link} to="/staff">
            Staff Dashboard
          </Button>
        )}

        {/* Logout Button */}
        <Button color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
