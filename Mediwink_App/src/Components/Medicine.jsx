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
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import medbg from "../assets/Images/image5.jpg";
import NavBar from "../Components/NavBar";

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [inputs, setInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const { patientId } = location.state || {};

  useEffect(() => {
    axios
      .get("https://localhost:7094/api/Medicine/GetAllMedicines")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  const handleInputChange = (id, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleAddToPrescription = async (med) => {
    const medDetails = {
      patientId: patientId,
      medId: med.medId,
      dosage: inputs[med.medId]?.dosage || "",
      duration: inputs[med.medId]?.duration || "",
      frequency: inputs[med.medId]?.frequency || "",
      remarks: inputs[med.medId]?.remarks || "",
    };

    try {
      await axios.post("https://localhost:7094/api/Prescription/AddPrescription", medDetails, {
        headers: { "Content-Type": "application/json" },
      });
      alert(`${med.medName} added to prescription successfully!`);
    } catch (error) {
      console.error("Error adding to prescription:", error);
      alert("Something went wrong while adding the medicine!");
    }
  };

  return (
    <>
    <NavBar/>
    <Box 
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f5f5",
        px: 6,
        py: 6,
        boxSizing: "border-box",
        backgroundImage: `url(${medbg})`,
        backgroundSize: "cover",
        overflowX: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        position: "relative",
        }}
      >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#333",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Medicines
      </Typography>

      {patientId && (
        <Typography
          variant="h6"
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            px: 3,
            py: 1,
            borderRadius: 2,
           boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            ml: "justify"
            
          }}
        >
          Prescription for Patient ID {patientId}
        </Typography>
      )}
    </Box>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          width: "40%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search medicine..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "#1976d2" }} />,
          }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, backgroundColor: "#fff8f8c4"}}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead sx={{ bgcolor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Medicine ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Medicine Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Medicine Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Dose</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Duration</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Frequency</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Remarks</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {medicines.map((med) => (
              <TableRow key={med.medId}>
                <TableCell>{med.medId}</TableCell>
                <TableCell>{med.medName}</TableCell>
                <TableCell>{med.medType}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    placeholder="e.g. 1-0-1"
                    variant="outlined"
                    value={inputs[med.medId]?.dosage || ""}
                    onChange={(e) => handleInputChange(med.medId, "dosage", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    placeholder="e.g. 5"
                    variant="outlined"
                    value={inputs[med.medId]?.duration || ""}
                    onChange={(e) => handleInputChange(med.medId, "duration", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    placeholder="e.g. 2"
                    variant="outlined"
                    value={inputs[med.medId]?.frequency || ""}
                    onChange={(e) => handleInputChange(med.medId, "frequency", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="medium"
                    placeholder="e.g. Before meal"
                    variant="outlined"
                    value={inputs[med.medId]?.remarks || ""}
                    onChange={(e) => handleInputChange(med.medId, "remarks", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleAddToPrescription(med)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}

export default Medicine;
