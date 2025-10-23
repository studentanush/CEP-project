import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VolunteerPage from "./pages/VolunteerPage";
import NGOPage from "./pages/NGOPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import VolunteerAuth from "./pages/VolunteerLogin";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import NGOLogin from "./pages/NGOLogin";
import { ToastContainer } from "react-toastify"
function App() {
  const[ isAuthenticated,setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated?element:<Navigate to = "/login"/>
  }
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer/>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/volunteer" element={<PrivateRoute element={<VolunteerPage/>}/>}/>
            <Route path="/ngo" element={<NGOPage />} />
            <Route path="/login" element={<VolunteerAuth/>}/>
            <Route path="/ngologin" element = {<NGOLogin/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
