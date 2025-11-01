import React, { useEffect, useState } from "react";
import NgoSidebar from "../components/NgoSidebar";
import { FaEdit, FaTrash, FaUsers, FaChartBar } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { FaArrowLeft } from "react-icons/fa";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
const MyPosts = () => {
    const [filter, setFilter] = useState("all");
    const [posts, setPosts] = useState([]);
    const [view, setView] = useState(false);
    const [viewDetails, setViewDetails] = useState([]);
    const [vCount, setVCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);
const [showDeletePopup, setShowDeletePopup] = useState(false);


    const [updateDetails, setUpdateDetails] = useState({});

    const updateGet = async (id) => {
        setEditPopup(true);
        try {
            const response = await axios.get(BACKEND_URL + "/ngo/posts");
            const posts = response.data.posts;
            const post = posts.find(p => p._id === id);
            console.log(post);
            console.log("before update ; " + post);
            setUpdateDetails(post);


        } catch (error) {
            console.log(error);
        }
    }

    const updatePost = async () => {
        console.log(updateDetails);
        try {

            await axios.put(BACKEND_URL + "/ngo/updatepost", {
                id: updateDetails._id,
                title: updateDetails.title,
                desc: updateDetails.desc,
                location: updateDetails.location,
                startDate: updateDetails.startDate,
                endDate: updateDetails.endDate,
                status: updateDetails.status,
                postType: updateDetails.postType
            })
            toast.success("updated successfully");
            setEditPopup(false)

        } catch (error) {
            console.log(error);
        }

    }
    const deleteReq = async (id) => {
        //setShowPopup(true);
        console.log(id)
        try {
            
                await axios.delete(BACKEND_URL + "/ngo/myposts", {
                    params: { id },
                });
                console.log("Deleted successfully..");
                toast.success("Deleted successfully..");
                setShowPopup(false);
           

        } catch (error) {
            console.log(error);
        }
    }

    const viewData = async (id) => {
        setView(true)
        try {
            const res = await axios.get(BACKEND_URL + "/ngo/posts");
            const posts = res.data.posts;
            const post = posts.find(p => p._id === id);
            console.log(post);
            setViewDetails(post)
            const res1 = await axios.get(BACKEND_URL + "/ngo/applyUsers", {
                params: {
                    ngoDataId: id,
                }
            })
            console.log("hereh is")
            const users = res1?.data?.res2 || [];
            console.log(res1);
            setVCount(users.length);
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }


    const data1 = async () => {
        try {
            const ngoInfo = JSON.parse(localStorage.getItem("ngo-info"));
            const token = ngoInfo?.token;
            console.log(token)
            const mypostsRes = await axios.get(BACKEND_URL + "/ngo/myposts", {
                headers: {
                    Authorization: `${token}`, // <-- Include "Bearer " prefix,
                }
            })
            const posts = mypostsRes?.data?.posts || [];
            console.log(posts);
            setPosts(posts);
        } catch (error) {
            console.log(error);
        }


    }
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
    const statuses = ["active", "completed","closed"];


    useEffect(() => {

        data1();
        //data2();

    }, [])


    const filteredPosts = filter === "all" ? posts : posts.filter((p) => p.status === filter);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };
    const handleDeleteClick = (id) => {
        setDeletePostId(id);
        setShowPopup(true);
    };
    return (
        <div className="flex min-h-screen bg-gray-900 relative">

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    {/* Popup Box */}
                    <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className=" cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                        >
                            ✖
                        </button>

                        {/* Popup Content */}
                        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                            Confirmation
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="cursor-pointer px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button onClick={() => deleteReq(deletePostId)} className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {editPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white w-[90%] max-w-2xl p-8 rounded-2xl shadow-2xl border border-gray-700">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-blue-400">Edit Opportunity</h2>
                            <button
                                onClick={() => setEditPopup(false)}
                                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            <input
                                type="text"
                                placeholder="Title"
                                value={updateDetails.title || ""}
                                onChange={(e) =>
                                    setUpdateDetails({ ...updateDetails, title: e.target.value })
                                }
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={updateDetails.location || ""}
                                onChange={(e) =>
                                    setUpdateDetails({ ...updateDetails, location: e.target.value })
                                }
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm text-gray-400">Start Date</label>
                                    <input
                                        type="date"
                                        value={updateDetails.startDate?.slice(0, 10) || ""}
                                        onChange={(e) =>
                                            setUpdateDetails({
                                                ...updateDetails,
                                                startDate: e.target.value,
                                            })
                                        }
                                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="text-sm text-gray-400">End Date</label>
                                    <input
                                        type="date"
                                        value={updateDetails.endDate?.slice(0, 10) || ""}
                                        onChange={(e) =>
                                            setUpdateDetails({
                                                ...updateDetails,
                                                endDate: e.target.value,
                                            })
                                        }
                                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <textarea
                                placeholder="Description"
                                rows="4"
                                value={updateDetails.desc || ""}
                                onChange={(e) =>
                                    setUpdateDetails({ ...updateDetails, desc: e.target.value })
                                }
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            ></textarea>

                            <div className="flex gap-4">
                                <select
                                    value={updateDetails.postType || ""}
                                    onChange={(e) =>
                                        setUpdateDetails({ ...updateDetails, postType: e.target.value })
                                    }
                                    className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Post Type</option>
                                    {postTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={updateDetails.status || ""}
                                    onChange={(e) =>
                                        setUpdateDetails({ ...updateDetails, status: e.target.value })
                                    }
                                    className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Status</option>
                                    {statuses.map((s, index) => (
                                        <option key={index} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Update Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => updatePost()}
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-white font-semibold transition-all duration-300"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>

            )}
            <NgoSidebar />
            {view ? (
                <div className=" overflow-y-auto h-screen w-full bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white p-10 rounded-2xl shadow-xl border border-gray-700">

                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => setView(false)}
                            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-200"
                        >
                            <FaArrowLeft className="text-xl" />
                            <span className="text-lg font-medium">Back</span>
                        </button>
                    </div>
                    {/* NGO Name */}

                    <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-tight">
                        {viewDetails?.ngoUserId?.name || "NGO Name"}
                    </h2>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold mb-4 text-gray-100">
                        {viewDetails?.title || "Post Title"}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 whitespace-pre-line">
                        {viewDetails?.desc || "No description provided."}
                    </p>
                    <h2 className=" mb-2 flex items-center gap-3 text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent m-2">
                        👥 Applied Volunteers: <span className="text-gray-100">{vCount}</span>
                    </h2>


                    {/* Grid for details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700">
                            <p className="text-sm text-gray-400">📍 Location</p>
                            <p className="text-lg font-medium">{viewDetails?.location || "—"}</p>
                        </div>

                        <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700">
                            <p className="text-sm text-gray-400">📅 Start Date</p>
                            <p className="text-lg font-medium">
                                {viewDetails?.startDate
                                    ? new Date(viewDetails.startDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </p>
                        </div>

                        <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700">
                            <p className="text-sm text-gray-400">📅 End Date</p>
                            <p className="text-lg font-medium">
                                {viewDetails?.endDate
                                    ? new Date(viewDetails.endDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </p>
                        </div>

                        <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700 sm:col-span-2 lg:col-span-3">
                            <p className="text-sm text-gray-400">🎯 Post Type</p>
                            <p className="text-lg font-medium text-blue-400">
                                {viewDetails?.postType || "—"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white p-8 rounded-2xl shadow-xl border border-gray-700 mt-6 max-h-[80vh] overflow-y-auto">
                        {/* Heading */}
                        <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-tight flex items-center gap-2">
                            👥 Applied Volunteers
                        </h2>

                        {/* No Volunteers */}
                        {users.length === 0 ? (
                            <p className="text-gray-400 text-center text-lg mt-8">
                                No volunteers have applied yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {users.map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-gray-800/70 p-5 rounded-xl border border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <FaUserCircle className="text-blue-400 text-3xl" />
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {user?.userId?.name || "Unknown User"}
                                                </h3>
                                                <p className="text-gray-400 flex items-center gap-2 text-sm">
                                                    <FaEnvelope className="text-gray-500" />
                                                    {user?.userId?.email || "No Email"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            ) : (

                <div className="flex-1 flex flex-col text-white bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800">
                    <div className="flex-1 overflow-y-auto p-8">
                        <h1 className="text-3xl font-bold mb-6 tracking-tight">📝 My Posts</h1>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3 mb-8 sticky top-0 bg-gray-900/80 backdrop-blur-md py-3 z-10">
                            {["All", "Active", "Completed","Closed"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type.toLowerCase())}
                                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${filter === type
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-[1.01]"
                                >
                                    {/* Title & Status */}
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-xl font-semibold text-gray-100">{post.title}</h2>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === "active"
                                                ? "bg-emerald-600/20 text-emerald-400"
                                                : post.status === "completed"
                                                    ? "bg-blue-600/20 text-blue-400"
                                                    : "bg-yellow-600/20 text-red-400"
                                                }`}
                                        >
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Dates */}
                                    <p className="text-gray-400 text-sm mb-4">
                                        📅 {formatDate(post.startDate)} → {formatDate(post.endDate)}
                                    </p>

                                    {/* Optional analytics area */}
                                    <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            {/* <FaUsers className="text-gray-500" /> {post.applicants || 0} Applicants */}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* <FaChartBar className="text-gray-500" /> {post.joined || 0} Joined */}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => updateGet(post._id)}
                                            className="flex items-center gap-2 bg-gray-700/70 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                                        >
                                            <FaEdit className="text-gray-300" /> Edit
                                        </button>

                                        <button
                                            onClick={() => viewData(post._id)}
                                            className="flex items-center gap-2 bg-gray-700/70 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            onClick={() => handleDeleteClick(post._id)}
                                            className="flex items-center gap-2 bg-gray-700/70 hover:bg-gray-600 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredPosts.length === 0 && (
                            <div className="text-gray-400 text-center mt-10 text-lg">
                                No posts found for this filter.
                            </div>
                        )}
                    </div>
                </div>



            )}
            {/* Main Content */}


        </div>
    );
};

export default MyPosts;
