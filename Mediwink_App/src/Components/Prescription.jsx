import React, { useEffect, useState } from "react";
import presbg from "../assets/Images/image5.jpg";
import NavBar from "../Components/NavBar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://localhost:7094/api/Prescription/getPrescriptionByPatientId?patientId=${userId}`)
      .then((response) => {
        setPrescriptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching prescriptions:", error);
        setError("Failed to load prescriptions.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
  
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
          bgcolor: "#fafafa",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
            
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${presbg})`,
          alignItems: "center",
          bgcolor: "#fafafa",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <>
    <NavBar/>
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f9fafc",
        backgroundImage: `url(${presbg})`,
        p: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1976d2", mb: 3 }}
      >
        My Prescriptions
      </Typography>

      {prescriptions.length === 0 ? (
        <Typography color="text.secondary">No prescriptions found.</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Medicine Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Medicine Type
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Dosage
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Duration
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Frequency
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>
                  Remarks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f1f7ff" },
                    transition: "0.3s",
                  }}
                >
                  <TableCell>{item.medName}</TableCell>
                  <TableCell>{item.medType}</TableCell>
                  <TableCell>{item.dosage}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.frequency}</TableCell>
                  <TableCell>{item.remarks || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </>
  );
}

export default Prescription;
