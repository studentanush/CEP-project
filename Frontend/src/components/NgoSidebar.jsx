import React from 'react'
import { useNavigate } from 'react-router-dom'

const NgoSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-72 h-screen border-r border-gray-700 bg-gray-800 p-5">
      <div className="space-y-4 text-gray-300">
        <div 
          onClick={() => navigate("/ngo")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          Dashboard
        </div>

        <div 
          onClick={() => navigate("/myposts")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          My Posts
        </div>

        <div 
          onClick={() => navigate("/postopportunity")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          + Post Opportunity
        </div>

        <div 
          onClick={() => navigate("/feedbacks")} 
          className="font-semibold text-lg hover:text-blue-300 cursor-pointer"
        >
          Feedbacks
        </div>
      </div>
    </div>
  )
}

export default NgoSidebar
