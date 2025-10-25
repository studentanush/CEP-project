import React from 'react'
import { useNavigate } from 'react-router-dom'

const VolunteerSidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="w-72 h-screen border-r border-gray-700 bg-gray-800 p-5">
      <div className="space-y-4 text-gray-300">
        <div 
          onClick={() => navigate("/volunteer")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          Browse
        </div>

        <div 
          onClick={() => navigate("/myvolunteering")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          My volunteering
        </div>

        
      </div>
    </div>
  )
}

export default VolunteerSidebar