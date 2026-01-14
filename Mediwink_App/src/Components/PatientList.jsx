
import React, { useEffect, useState } from "react";
import patlistbg from "../assets/Images/image5.jpg";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";

function PatientList() {
  const navigate= useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7094/api/User/GetUserbyType?user_type=p"
      );
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientId) => {
    const doctorId = sessionStorage.getItem("docId");

    if (!doctorId) {
      alert("Doctor ID not found in session. Please log in again.");
      navigate("/login");
      return;
    }

    const data = {
      patientId: patientId,
      docId: doctorId,
      
    };

    try {
      await axios.post("https://localhost:7094/api/User/LinkPatientwithDoc", data);
      alert("Patient successfully added!");
      navigate("/doctor");

    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient. Please try again.");
    }
  };

  return (
    <>
    <NavBar/>
    
    <Box
      sx={{
        backgroundImage: `url(${patlistbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "rgba(255, 255, 255, 0.24)",
        minHeight: "100vh",
        width:"100vw",
        padding: "50px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 900,
          bgcolor: "rgba(255, 255, 255, 0.62)",
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}
          >
            Patient List
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Patient ID
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Contact
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((p, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{p.userid}</TableCell>
                      <TableCell>{p.userName}</TableCell>
                      <TableCell>{p.email}</TableCell>
                      <TableCell>{p.contact}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAddPatient(p.userid)}
                        >
                          Add Patient
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
    </>
  );
}

export default PatientList;
