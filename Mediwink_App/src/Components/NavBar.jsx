import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.userName || "User";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#06d5ff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left-aligned App Name */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", ml: 2 }}
          onClick={() => navigate("/")}
        >
          Mediwink
        </Typography>

        {/* Right-aligned Buttons + Username */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mr: 3 }}>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Typography sx={{ fontWeight: 500 }}>Hello, {userName}</Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
