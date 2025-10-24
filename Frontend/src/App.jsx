import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VolunteerPage from "./pages/VolunteerPage";
import NGOPage from "./pages/NGOPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import VolunteerAuth from "./pages/VolunteerLogin";
import { useContext, useState } from "react";

import NGOLogin from "./pages/NGOLogin";
import { ToastContainer } from "react-toastify"
import { ContextAPI } from "./Context";
function App() {
  const {isUserAuthenticated,isNgoAuthenticated} = useContext(ContextAPI);
  
  const PrivateRoute1 = ({element})=>{
    return isUserAuthenticated?element:<Navigate to = "/login"/>
  }
  const PrivateRoute2 = ({element}) => {
    return isNgoAuthenticated? element:<Navigate to = "/ngologin"/>
  }
  return (
   
      <div className="flex flex-col min-h-screen">
        <ToastContainer/>
        
        <Navbar  />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/volunteer" element={<PrivateRoute1 element={<VolunteerPage/>}/>}/>
            <Route path="/ngo" element={<PrivateRoute2 element={<NGOPage/>}/>} />
            <Route path="/login" element={<VolunteerAuth/>}/>
            <Route path="/ngologin" element = {<NGOLogin/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;
