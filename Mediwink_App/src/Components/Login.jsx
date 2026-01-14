import { Box, Container, TextField, Typography, Button, Link } from "@mui/material";
import React, { useState } from "react";
import loginbg from "../assets/Images/image2.jpg";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://localhost:7094/api/User/Login", 
      formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login Successful:", response.data);
    setMessage(`Welcome ${response.data.userName} (${response.data.user_Type})`);

    // Store entire user object
    localStorage.setItem("user", JSON.stringify(response.data));

    // Also store session data based on user type
    if (response.data.user_Type === "D") {
      sessionStorage.setItem("docId", response.data.userId);
      console.log("Doctor logged in. DocId stored:", response.data.userId);
    } else {
      sessionStorage.setItem("userId", response.data.userId);
      console.log("Patient logged in. UserId stored:", response.data.userId);
    }

    // Optional: redirect based on user type
    if (response.data.user_Type === "D") {
      window.location.href = "/doctor";
    } else {
      window.location.href = "/patient";
    }

    } 
    catch (error) 
    {
      if (error.response && error.response.status === 401) {
      setMessage("Invalid credentials. Please try again.");
      } 
      else {
        setMessage("Something went wrong. Please check the server.");
      }

    
    }
  };

  return (
<Box
  sx={{
    width: "100vw", // Full viewport width
    height: "100vh", // Full viewport height (forces full screen)
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden" // Prevents scrollbars
  }}
>
  <Container
    maxWidth="sm"
    sx={{
      bgcolor: "rgba(247, 247, 247, 0.75)",
      p: 4,
      borderRadius: 3,
      boxShadow: 5,
      textAlign: "center",
    }}
  >
    <Typography variant="h6" align="left">
      Are you already a user?
    </Typography>
    <Typography variant="h3" align="center" gutterBottom>
      Login
    </Typography> 

    <form onSubmit={handleSubmit}>
      <TextField
        variant="filled"
        id="email"
        name="email"
        label="Email Address"
        margin="normal"
        fullWidth
        required
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        id="password"
        name="password"
        label="Password"
        type="password"
        margin="normal"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      

      <Typography align="center" sx={{ mt: 2 }}>
        <Link href="/register" underline="hover">
          New user? Register here
        </Link>
      </Typography>
    </form>
  </Container>
  
</Box>

  );
}

export default Login;
