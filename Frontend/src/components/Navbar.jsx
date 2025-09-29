import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
export default function Navbar({isAuthenticated,setIsAuthenticated}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // state for popup

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    setUserInfo(null);
    navigate("/login");
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, [location,isAuthenticated,setIsAuthenticated]);

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
          className="text-2xl font-extrabold text-cyan-400 tracking-wide pl-8"
        >
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
                className="w-12 h-12 rounded-full cursor-pointer"
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
                    onClick={handleLogout}
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
