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

import MyPosts from "./pages/MyPosts";
import PostOpportunity from "./pages/PostOpportunity";
import Feedbacks from "./pages/Feedbacks";
import MyVolunteering from "./pages/MyVolunteering";
function App() {
  const { isUserAuthenticated, isNgoAuthenticated } = useContext(ContextAPI);

  const PrivateRoute1 = ({ element }) => {
    return isUserAuthenticated ? element : <Navigate to="/login" />
  }
  const PrivateRoute2 = ({ element }) => {
    return isNgoAuthenticated ? element : <Navigate to="/ngologin" />
  }
  return (

    <div className="flex flex-col min-h-screen">
      <ToastContainer />

      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/volunteer" element={<PrivateRoute1 element={<VolunteerPage />} />} />
          <Route path="/ngo" element={<PrivateRoute2 element={<NGOPage />} />} />
          <Route path="/login" element={<VolunteerAuth />} />
          <Route path="/ngologin" element={<NGOLogin />} />
          
          <Route path='/myposts' element={<MyPosts />} />
          <Route path='/postopportunity' element={<PostOpportunity />} />
          <Route path='/feedbacks' element={<Feedbacks />} />
          <Route path='/myvolunteering' element={<MyVolunteering />} />
          
        </Routes>
      </main>
      <Footer />
    </div>

  );
}

export default App;
