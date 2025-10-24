import React from 'react'

import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const ContextAPI = createContext();
const Context = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [ngoUserInfo, setNgoUserInfo] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isNgoAuthenticated, setIsNgoAuthenticated] = useState(false);
  const location = useLocation();
  const navigate =  useNavigate();
  const handleUserLogout = () => {
    localStorage.removeItem("user-info");
    setUserInfo(null);
    setIsUserAuthenticated(false);
    toast.success("Logout Successfully")
    navigate("/login");
  }
  const handleNgoLogout = () => {
    localStorage.removeItem("ngo-info");
    setNgoUserInfo(null);
    setIsNgoAuthenticated(false);
    toast.success("Logout successfully");
    navigate("/ngologin")
  }
  useEffect(() => {
    const data1 = localStorage.getItem("user-info");
    const data2 = localStorage.getItem("ngo-info");
    if(data1){
        const token1 = JSON.parse(data1)?.token;
        if(token1){
          setIsUserAuthenticated(true);
          if(location.pathname==="/login"){
            navigate("/volunteer");
          }
        }
        
    }
    const userData = data1?  JSON.parse(data1) : null;
    setUserInfo(userData);
    if(data2){
        const token2 = JSON.parse(data2)?.token;
        if(token2){
          setIsNgoAuthenticated(true);
          if(location.pathname==="/ngologin"){
            navigate("/ngo");
          }
        }
    }
    const ngoData = data2 ? JSON.parse(data2):null;
    setNgoUserInfo(ngoData);
  }, [location])

  return (

        <ContextAPI.Provider value = {{
          userInfo,
           setUserInfo,
           ngoUserInfo,
           setNgoUserInfo,
           isUserAuthenticated,
           setIsUserAuthenticated,
           isNgoAuthenticated,
           setIsNgoAuthenticated,
           handleNgoLogout,
           handleUserLogout,

        }}>
           {props.children}
        </ContextAPI.Provider>
    
  )
}

export default Context