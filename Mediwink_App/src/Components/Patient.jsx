import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import patbg from "../assets/Images/image4.jpg";

import NavBar from "../Components/NavBar";

const Patient = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setPatientName(storedUser.userName || "Patient");
      setPatientId(storedUser.userId || "");
    }
  }, []);

  return (
    <>
    <NavBar/>
    
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${patbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        position: "relative",
      }}
    >
      {/* Header Section - Center Top */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="italic" sx={{color:"#f23fffff"}} >
          Welcome, {patientName}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, color: "#830067ff" }}>
          Patient ID: {patientId}
        </Typography>
      </Box>

      {/* Center Tile */}
      <Card
        onClick={() => navigate("/prescriptions")}
        sx={{
          width: 280,
          height: 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: "rgba(255,255,255,0.9)",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "0.3s",
            boxShadow: 10,
          },
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <AssignmentIcon sx={{ fontSize: 60, color: "#1976d2", mb: 1 }} />
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            My Prescriptions
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default Patient;
