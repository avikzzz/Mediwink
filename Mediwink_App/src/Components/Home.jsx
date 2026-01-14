import React from "react";
import { Box, Typography, Button } from "@mui/material";
import homebg from '../assets/Images/registration_bg.jpg'
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate= useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${homebg})`, // Add your background image URL here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* A subtle dark overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(239, 229, 229, 0.28)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box sx={{ zIndex: 1 , color:"#fc40bdff"}}>
        <Typography variant="h1" fontWeight="bold" gutterBottom>
          Welcome to Mediwink
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ zIndex: 1 , color:"#a3036eff"}} >
          A next gen Doctor - Patient communication system
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontStyle: "italic", mb: 5, color: "#610667ff" }}
        >
          Get well sooner & smarter
        </Typography>

        <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: "10px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={()=>navigate("/login")}
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: "10px",
              fontWeight: "bold",
              textTransform: "none",
              borderColor: "white",
              color: "white",
              "&:hover": { backgroundColor: "rgba(180, 236, 81, 0.78)" },
            }}
            onClick={()=>navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
