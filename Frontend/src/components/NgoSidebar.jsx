import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaClipboardList, FaPlusCircle, FaComments } from "react-icons/fa";

const NgoSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/ngo" },
    { name: "My Posts", icon: <FaClipboardList />, path: "/myposts" },
    { name: "Post Opportunity", icon: <FaPlusCircle />, path: "/postopportunity" },
    { name: "Feedbacks", icon: <FaComments />, path: "/feedbacks" },
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-6 shadow-xl">
      {/* Brand / Logo */}
      <h1 className="pt-1 text-3xl font-bold text-blue-400 tracking-wide mb-8 text-center h-17  border-b-2 ">
        NGO Portal
      </h1>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-blue-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NgoSidebar;
