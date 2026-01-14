import { Box, Button, colors, Container, FormControlLabel, Radio, RadioGroup, Switch, TextField, Typography } from "@mui/material";
import React,{useEffect, useState} from "react";
import registerbg from '../assets/Images/registration_bg.jpg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration(){

  const navigate= useNavigate();

  const [formData, setFormData] = useState(
    {
      userName:"",
      email: "",
      password: "",
      usertype:false,
      gender:"",
      contact: ""


    }
  );

  // for debugging - log formData
  useEffect(
    ()=>{
      console.log(formData);

    }, [formData]           // this is telling react to run the function inside {} when formData changes
  );


  const handleSubmit= async(event)=>{

    event.preventDefault();

    const fdata = {

      ...formData, usertype: formData.usertype ? "D" : "P",
      contact: formData.contact === "" ? null : Number(formData.contact)
    };

    try{
      const response = await axios.post("https://localhost:7094/api/User/RegisterUser/",
        fdata,
        { headers :{ "Content-Type":"application/json"}}
      );


      console.log("Success : ", response.data);
      alert("Registration Successful");
      navigate("/login");
    }
    catch(error){
      console.error("Error". error);
      alert("Registration Failed");
    }

  };
  const handleChange=(event)=>{
    const {name, value, type, checked}= event.target;

    setFormData( (prev)=>(
      {
        ...prev,[name]: type === "checkbox"?  checked: value,
      }
    )



    );
  };

  



  return(
    
    <Box sx={{
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${registerbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" gutterBottom >
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField id="userName" name="userName" label="Full Name" variant="filled" value={formData.userName} onChange={handleChange} fullWidth margin="normal" required ></TextField>
        <TextField id="email" name="email" label="Email Address" variant="filled" value={formData.email} onChange={handleChange} fullWidth margin="normal" required></TextField>
        <TextField id="password" name="password" label="Password" type="password" variant="filled" value={formData.password} onChange={handleChange} fullWidth margin="normal"required ></TextField>
        <FormControlLabel control={<Switch  id="userrole" checked={formData.usertype} onChange={handleChange}  name ="usertype"  ></Switch>} label="Are you a Doctor ?"  margin="normal" ></FormControlLabel>
        <Typography align="center" variant="h5">Gender</Typography>
        <RadioGroup row label="Gender" name="gender" id="gender" value={formData.gender} onChange={handleChange} style={{justifyContent:"center"}}>
          <FormControlLabel value="M" control={<Radio/>} label="Male"/>
          <FormControlLabel value="F" control={<Radio/>} label="Female"/>
          <FormControlLabel value="O" control={<Radio/>} label="Others"/>

        </RadioGroup>
        <TextField id="contact" label="Phone Number" type="number" variant="filled" name="contact" value={formData.contact} onChange={handleChange} fullWidth margin="normal"required ></TextField>
        <Button variant="contained" color="primary" type="submit">Get Started</Button>
    
                                    
      
      </form>
    </Container>
    </Box>
    
    



  )


}

export default Registration;