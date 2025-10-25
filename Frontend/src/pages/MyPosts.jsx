import React, { useEffect, useState } from "react";
import NgoSidebar from "../components/NgoSidebar";
import { FaEdit, FaTrash, FaUsers, FaChartBar } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { FaArrowLeft } from "react-icons/fa";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
const MyPosts = () => {
    const [filter, setFilter] = useState("all");
    const [posts, setPosts] = useState([]);
    const [view, setView] = useState(false);
    const [viewDetails, setViewDetails] = useState([]);
    const [vCount, setVCount] = useState(0);
    const [users, setUsers] = useState([]);
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
    // const data2 = async ({ id }) => {
    //     try {
    //         const appliedUsers = await axios.get(
    //             `${BACKEND_URL}/ngo/appliedUsers`,
    //             {
    //                 headers: {
    //                     Authorization: `${token}`,
    //                 },
    //                 params: {
    //                     ngoDataId: id,
    //                 },
    //             }
    //         );

    //         const volunteer = appliedUsers?.data?.res2 || [];
    //         const applicants = volunteer.filter(v => v.approve === "n").length;
    //         const joined = volunteer.filter(v => v.approve === "y").length;



    //     } catch (error) {
    //         console.error("Error fetching applied users:", error);
    //     }
    // };

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
    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Sidebar */}
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
                            {["All", "Active", "Completed"].map((type) => (
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
                                    key={post.id}
                                    className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-xl font-semibold">{post.title}</h2>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${post.status === "Active"
                                                ? "bg-green-600/30 text-green-400"
                                                : post.status === "Closed"
                                                    ? "bg-red-600/30 text-red-400"
                                                    : "bg-yellow-600/30 text-yellow-400"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4">
                                        📅 {formatDate(post.startDate)} - {formatDate(post.endDate)}
                                    </p>

                                    {/* Analytics */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-2 text-blue-400">
                                            {/* <FaUsers /> {post.applicants} Applicants */}
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400">
                                            {/* <FaChartBar /> {post.joined} Joined */}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between">
                                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition-all">
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => viewData(post._id)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl text-sm font-medium transition-all">
                                            View
                                        </button>
                                        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl text-sm font-medium transition-all">
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
