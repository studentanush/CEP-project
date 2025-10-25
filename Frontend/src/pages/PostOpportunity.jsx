import React, { useState } from "react";
import NgoSidebar from "../components/NgoSidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";

const PostOpportunity = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        postType: "",
    });

    const [loading, setLoading] = useState(false); // ✅ loading state

    const postTypes = [
        "Education & Teaching",
        "Environment & Sustainability",
        "Animal Welfare",
        "Health & Hygiene",
        "Community Development",
        "Elderly Care",
        "Child Welfare",
        "Disaster Relief & Emergency Services",
        "Arts & Culture",
        "Fundraising & Campaigns",
        "Technology for Good",
        "Human Rights & Legal Aid",
        "Sports & Fitness Initiatives",
        "Mental Health & Counselling",
        "Special Needs Support",
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        try {
            const ngoInfo = JSON.parse(localStorage.getItem("ngo-info"));
            const token = ngoInfo?.token;

            await axios.post(
                BACKEND_URL + "/ngo/post",
                {
                    title: formData.title,
                    desc: formData.description,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    location: formData.location,
                    postType: formData.postType,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setFormData({
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                location: "",
                postType: "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white">
            <NgoSidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-semibold mb-6 text-gray-100">
                    🌍 Post New Opportunity
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 rounded-2xl p-8 shadow-md w-full max-w-7xl"
                >
                    {/* Grid layout for inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter opportunity title"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write about the opportunity..."
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-400 mb-1">Post Type</label>
                            <select
                                name="postType"
                                value={formData.postType}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select post type</option>
                                {postTypes.map((type, idx) => (
                                    <option key={idx} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className={` cursor-pointer px-6 py-3 rounded-lg font-semibold transition-colors ${loading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit Opportunity"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostOpportunity;
