import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { pink } from "@mui/material/colors"
import { useEffect, useState } from "react"
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom"
import doclinkbg from "../assets/Images/image6.jpg";
import NavBar from "../Components/NavBar";

function DocLinkPatient(){

    const [docPatients, setdocPatients]= useState([]);

    const navigate=useNavigate();

    useEffect(()=>{
        const docId = sessionStorage.getItem("docId");

        if (!docId) {
            console.error("No doctor ID found in sessionStorage");
            return;
        }
        axios 
        .get(`https://localhost:7094/api/User/getPatientsLinktoDoc?docId=${docId}`)
        .then((response)=>{
            setdocPatients(response.data);
        })
        .catch((error)=>{
            console.error("Error fetching patients:", error);
        });
    },[]);




    return(
        <>
        <NavBar/>
        <Box sx={{
                minHeight: "100vh",
                width: "100vw",
                Color: "#ebebebff",
                backgroundImage: `url(${doclinkbg})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Typography variant="h4" sx={{bgcolor:"#f4f4f418" ,fontWeight: 600 }}>
                Your Patients
            </Typography>
            <TableContainer sx={{borderRadius: 3, backgroundImage:"#f4f4f48a" }}>
                <Table>
                    <TableHead sx={{bgcolor:"#c907ffbb"}}>
                        <TableRow>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Patient ID</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Patient Name</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Contact Number</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Gender</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Prescribe</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>Treatment History</TableCell>
                            <TableCell sx={{color: "#f4f4f4ff", fontWeight: 600}}>.</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docPatients.map((pat)=>(
                            <TableRow key={pat.docId}>
                                <TableCell sx={{bgcolor:"#fffbfe7c", fontWeight: 600}}>{pat.userid}</TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c", fontWeight: 600}}>{pat.userName}</TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c", fontWeight: 600}}>{pat.contact}</TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c", fontWeight: 600}}>{pat.gender}</TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c"}}>
                                    <Button variant="contained" color="success" onClick={()=> navigate("/medicine",{
                                        state:{patientId:pat.userid},
                                    })}>Prescribe</Button>
                                </TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c"}}>
                                    <Button variant="contained" color="secondary" onClick={()=>navigate("/prescriptions")}>History</Button>
                                </TableCell>
                                <TableCell sx={{bgcolor:"#fffbfe7c"}}>
                                    <IconButton aria-label="delete" color="primary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    )
}

export default DocLinkPatient