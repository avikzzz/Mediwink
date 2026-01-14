import React from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import docbg from "../assets/Images/image1.jpg";
function Doctor() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.userName || "User";

  const navigate=useNavigate();


  return (
    <>
    <NavBar/>
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        Color: "#ebebeb65",
        backgroundImage: `url(${docbg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      
    >
      

      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          mb: 8,
          fontWeight: 600,
          color: "#fffefeff",
          textAlign: "center",
        }}
      >
        Welcome Dr. {userName}
      </Typography>
      
      {/* Two big tiles side by side */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10, // space between tiles
          width: "100%",
          
        }}
      >
        {/* Add New Patient */}
        <Card
          elevation={6}
          sx={{
            width: "300px",
            height: "200px",
            borderRadius: 4,
            backgroundColor: "#ac46ebff",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardActionArea  sx={{ height: "100%" }}  onClick={()=>navigate("/patList")} >
            <CardContent
              sx={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
              <Typography variant="h5" color="white" gutterBottom>
                Add New Patient
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Register and manage patient information.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* My Patients */}
        <Card
          elevation={6}
          sx={{
            width: "300px",
            height: "200px",
            borderRadius: 4,
            backgroundColor: "#0ee9f1ff",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardActionArea sx={{ height: "100%" }} onClick={()=>navigate("/docLink")}>
            <CardContent
              sx={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" color="white" gutterBottom>
                My Patients
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and monitor your registered patients.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
    </>
  );
}

export default Doctor;
