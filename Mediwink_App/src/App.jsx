import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './Components/Registration';
import Doctor from './Components/Doctor';
import Login from './Components/Login'
import Medicine from './Components/Medicine';
import DocLinkPatient from './Components/DocLinkPatient';
import Home from './Components/Home';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes} from "react-router-dom";
import Prescription from './Components/Prescription';
import Patient from './Components/Patient';
import PatientList from './Components/PatientList';
import NavBar from './Components/NavBar';
function App() {
  
  return (
    <>
    <title>Mediwink</title>
    {/* <Login/>
    {/* <Registration/> */}

    
    {/* <Doctor/> */}
    

    {/* <Medicine/> */}
    {/* <DocLinkPatient/>  */}

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/medicine" element={<Medicine/>}/>
        <Route path="/doctor" element={<Doctor/>}/>
        <Route path="/docLink" element={<DocLinkPatient/>}/>
        <Route path="/prescriptions" element={<Prescription/>}></Route>
        <Route path="/patient" element={<Patient/>}/>
        <Route path="/patlist" element={<PatientList/>}/>
        <Route path="/navBar" element={<NavBar/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    </Router>
    
   
  
    </>
    
  )
}

export default App
