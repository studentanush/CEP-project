import React, { useState } from "react";
import Lottie from "lottie-react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import animationData from "../assets/NGOLogin.json";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const NGOLogin = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[number,setNumber] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
    const onSubmitHandler = async(e)=>{
        e.preventDefault();

        if(isSignup){
            // signup
            try {
                const response = await axios.post(BACKEND_URL + "/ngo/signup",{
                    name:name,
                    email:email,
                    password:password,
                    number:number,
                })
                setName("");
                setEmail("");
                setPassword("");
                setNumber("");
                console.log(response);
                toast.success(response.data.message + "sigin now!");
                
            } catch (error) {
                console.log(error);
                toast.error("Error Occured..");
                
            }
            
        }else{
            // signin
            try {
                const response = await axios.post(BACKEND_URL + "/ngo/signin",{
                    email:email,
                    password:password
                })
                console.log(response);
                toast.success(response.data.message);
                setEmail("");
                setPassword("");
                const token = response.data.token;
                const name = response.data.user.name;
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);
                localStorage.removeItem("user-info");
                navigate("/ngo")
            } catch (error) {
                console.log(error);
                toast.error("Error occured..");
            }
        }
    }
  return (
    <div className="h-screen flex items-center justify-between bg-gray-950 text-white p-8">
      {/* Left Animation Section */}
      <div className="ml-10 hidden md:block">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ height: 500, width: 700 }}
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-md mx-auto md:mr-10">
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4 text-3xl font-extrabold">
          Impact Connect
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-5">
          {isSignup && (
            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 focus-within:border-indigo-500">
              <FaUser className="text-gray-400 mr-3" />
              <input
                onChange={(e)=>setName(e.target.value)}
                value = {name}
                type="text"
                placeholder="Full Name"
                className="bg-transparent focus:outline-none flex-1 text-gray-200"
              />
            </div>
          )}

          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 focus-within:border-indigo-500">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
                onChange={(e)=>setEmail(e.target.value)}
                value = {email}
              type="email"
              placeholder="Email"
              className="bg-transparent focus:outline-none flex-1 text-gray-200"
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 focus-within:border-indigo-500">
            <FaLock className="text-gray-400 mr-3" />
            <input
            onChange={(e)=>setPassword(e.target.value)}
                value = {password}
              type="password"
              placeholder="Password"
              className="bg-transparent focus:outline-none flex-1 text-gray-200"
            />
          </div>

          {isSignup && (
            <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 focus-within:border-indigo-500">
              <FaPhone className="text-gray-400 mr-3" />
              <input
                 onChange={(e)=>setNumber(e.target.value)}
                value = {number}
                type="tel"
                placeholder="Phone Number"
                className="bg-transparent focus:outline-none flex-1 text-gray-200"
              />
            </div>
          )}

          <button
         
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 rounded-lg font-semibold mt-3"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Extra */}
        <div className="text-center mt-6 text-sm text-gray-400">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-indigo-400 hover:underline"
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-indigo-400 hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default NGOLogin;
