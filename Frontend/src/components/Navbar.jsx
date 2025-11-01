import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
//import { ContextAPI } from "../Context";
import { FaUser } from "react-icons/fa";
import { ContextAPI } from "../Context";
import image from "../assets/logo.png"
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  //const [userInfo, setUserInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // state for popup
  const {userInfo,setUserInfo,ngoUserInfo,setNgoUserInfo,handleUserLogout,handleNgoLogout} = useContext(ContextAPI);
 

  

  const links = [
    { to: "/", label: "Home" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/ngo", label: "NGO" },
  ];

  return (
    <nav className="bg-black/95 backdrop-blur-md text-white px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-cyan-400 tracking-wide pl-8 flex items-center font-serif"
        >
          <img src={image} className="w-25 h-15 pt-1" alt="" />
          Impact Connect
        </Link>
        <div className="space-x-6 flex items-center relative">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-cyan-300 transition ${
                location.pathname === to
                  ? "text-cyan-400 font-semibold"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Profile image with click popup */}
          {userInfo && (
            <div className="relative">
              <img
                onClick={() => setShowPopup(!showPopup)}
                referrerPolicy="no-referrer"
                src={userInfo.image}
                className="w-7 h-7 rounded-full cursor-pointer"
                alt="Profile"
              />

              {showPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between">
                      <p className="font-semibold">{userInfo.name}</p>
                      <IoMdClose onClick={()=>setShowPopup(false)} className="cursor-pointer" />
                  </div>
                  
                  <p className="text-sm text-gray-300">{userInfo.email}</p>
                  <button
                    onClick={handleUserLogout}
                    className=" cursor-pointer mt-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-1 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {ngoUserInfo && (
              <div className="relative">
                <FaUser
                onClick={() => setShowPopup(!showPopup)} 
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full cursor-pointer"
                alt="Profile"
                />
              

              {showPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between">
                      <p className="font-semibold">{ngoUserInfo.name}</p>
                      <IoMdClose onClick={()=>setShowPopup(false)} className="cursor-pointer" />
                  </div>
                  
                  <p className="text-sm text-gray-300">{ngoUserInfo.email}</p>
                  <button
                    onClick={handleNgoLogout}
                    className=" cursor-pointer mt-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-1 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
