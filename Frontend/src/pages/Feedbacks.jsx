import React, { useEffect, useState } from "react";
import NgoSidebar from "../components/NgoSidebar";
// import { FaStar } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Lottie from "lottie-react";
import animationData from "../assets/UnderConstruction.json";

const feedbackData = [
    {
        name: "Riya Sharma",
        message: "The volunteering experience was life-changing! The team was very supportive.",
        rating: 5,
        date: "Oct 20, 2025",
    },
    {
        name: "Aditya Verma",
        message: "Loved working with the NGO, but scheduling could be improved.",
        rating: 4,
        date: "Oct 18, 2025",
    },
    {
        name: "Sonal Patil",
        message: "Great organization and impactful projects!",
        rating: 5,
        date: "Oct 10, 2025",
    },
    {
        name: "Rohan Mehta",
        message: "Amazing work environment and helpful coordinators.",
        rating: 5,
        date: "Oct 8, 2025",
    },

];

const Feedbacks = () => {
    const [feedback, setFeedback] = useState([]);

    const data = async () => {
        try {
            const ngoInfo = JSON.parse(localStorage.getItem("ngo-info"));
            const token = ngoInfo?.token;
            const response = await axios.get(BACKEND_URL + "/ngo/feedback", {
                headers: {
                    Authorization:token
                }
            })
            const feedbacks = response?.data;
            console.log(feedbacks);
            
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        data();
    },[]);
    return (
        <div className="flex">
           
            <NgoSidebar />
            <div className="flex items-center justify-center h-203 w-full bg-black">
                <Lottie
          animationData={animationData}
          loop={true}
          style={{ height: 500, width: 700 }}
        />
            </div>
            
            
            {/* <div className="flex-1 text-white p-6 bg-black h-screen overflow-y-auto">
                <h1 className="text-3xl font-semibold mb-6 text-center">💬 Feedbacks</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbackData.map((feedback, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="flex items-center mb-3 gap-3">
                                <FaUserCircle className="text-4xl text-gray-300" />
                                <div>
                                    <h3 className="text-lg font-semibold">{feedback.name}</h3>
                                    <p className="text-sm text-gray-400">{feedback.date}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-3">{feedback.message}</p>

                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-xl mr-1 ${i < feedback.rating ? "text-yellow-400" : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

                
                <p className="text-gray-500 text-sm text-center mt-6 italic">
                    Scroll down for more feedback ⬇️
                </p>
            </div> */}
        </div>
    );
};

export default Feedbacks;
