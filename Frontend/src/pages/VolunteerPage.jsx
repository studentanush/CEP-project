import React, { useEffect, useState } from "react";
import VolunteerSidebar from "../components/VolunteerSidebar";
import { FaSearch, FaMapMarkerAlt, FaTag, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

const VolunteerPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState(false);
  const [viewDetails, setViewDetails] = useState([]);
  const [vCount, setVCount] = useState(0);


  const applyReq = async (id) => {

    try {
      const userInfo = JSON.parse(localStorage.getItem("user-info"));
      const token = userInfo?.token;
      const checkres = await axios.get(BACKEND_URL + "/ngo/checkAppliers", {
        headers: {
          Authorization: token,
        },
        params: {
          ngoDataId: id,
        },
      });

      const result = checkres?.data.res.find((p)=>p.apply==="y");
      if(result){
        toast.warning("Applied already");
        return;
      }
      console.log(checkres?.data);

      const response = await axios.post(BACKEND_URL + "/ngo/apply", {
        ngoDataId: id,
        ngoUserId: viewDetails.ngoUserId._id,
        apply: "y"
      }, {
        headers: {
          Authorization: token
        }
      })
      console.log("applied successfully")
      toast.success("Applied successfully..🥳")
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
      //const res1 = await axios.get(BACKEND_URL + "/ngo/")
      const res1 = await axios.get(BACKEND_URL + "/ngo/applyUsers", {
        params: {
          ngoDataId: id,
        }

      })
      console.log("hereh is")
      const users = res1?.data?.res2 || [];
      console.log(res1);
      setVCount(users.length);
    } catch (error) {
      console.log(error);
    }
  }
  const data = async () => {

    try {
      const response = await axios.get(BACKEND_URL + "/ngo/posts");
      const posts = response?.data?.posts || [];
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    data();
  }, [])
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

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Indore",
  ];

  // Dummy Data


  return (
    <div className="flex">
      <VolunteerSidebar />
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
          <div className="flex justify-end w-100%">
            <button
              onClick={() => applyReq(viewDetails._id)}
              className=" cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-black min-h-screen text-white p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 w-full sm:w-1/2">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search opportunities..."
                className="bg-transparent outline-none text-gray-200 flex-1"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Type Filter */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">Filter by Type</option>
                {postTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">Filter by Location</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Section */}
          <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {post.ngoUserId.name}
                </h2>
                <h3 className="text-lg font-medium text-gray-100 mb-3">
                  {post.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {post.location}
                  </span>
                  <span className="flex items-center gap-1">
                    📅{" "}
                    {new Date(post.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(post.endDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-sm bg-blue-900/30 border border-blue-700 text-blue-400 px-3 py-1 rounded-full">
                    <FaTag />
                    {post.postType}
                  </div>
                  <button onClick={() => viewData(post._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
      {/* Main Content */}

    </div>
  );
};

export default VolunteerPage;
