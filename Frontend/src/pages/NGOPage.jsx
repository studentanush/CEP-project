import React, { useEffect, useMemo, useState } from "react";
import NgoSidebar from "../components/NgoSidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { BACKEND_URL } from "../config";

const NGOPage = () => {

  const [volunteers, setVolunteers] = useState([]);

  // 🧩 Dummy data (will be replaced by backend later)
  const [stats, setStats] = useState({
    totalPosts: 0,
    activeOpportunities: 0,
    completedOpportunities: 0,
    totalVolunteers: 0,
  });
  const data = async () => {
    try {
      const ngoInfo = JSON.parse(localStorage.getItem("ngo-info"));
      const token = ngoInfo?.token;
      console.log(token)
      const mypostsRes = await axios.get(BACKEND_URL + "/ngo/myposts", {
        headers: {
          Authorization: `${token}`, // <-- Include "Bearer " prefix,
        }
      })

      const appliedUsers = await axios.get(BACKEND_URL + "/ngo/appliedUsers", {
        headers: {
          Authorization: `${token}`,
        }
      })
      const posts = mypostsRes?.data?.posts || [];
      const volunteer = appliedUsers?.data?.res1 || [];
      console.log(volunteer)
      setVolunteers(volunteer);
      const totalPosts = posts.length;
      const activeOpportunities = posts.filter(p => p.status === "active").length;

      const completedOpportunities = posts.filter(p => p.status === "completed").length;
      const totalVolunteers = volunteer.length;
      console.log(posts)
      console.log(activeOpportunities);
      setStats({
        totalPosts,
        activeOpportunities,
        completedOpportunities,
        totalVolunteers,
      })

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {

    data();
  }, [])
  // Chart data
  const opportunityData = [
    { name: "Active", value: stats.activeOpportunities },
    { name: "Completed", value: stats.completedOpportunities },
  ];

  const volunteerData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize all months with 0
    const monthCount = Array(12).fill(0);

    volunteers.forEach((v) => {
      if (v.date) {
        const d = new Date(v.date);
        const monthIndex = d.getMonth(); // 0–11
        monthCount[monthIndex]++;
      }
    });

    return months.map((m, i) => ({
      name: m,
      volunteers: monthCount[i],
    }));
  }, [volunteers]);
  console.log(volunteerData);

  const COLORS = ["#60A5FA", "#34D399"];

  return (
    <div className="flex">
      {/* Sidebar */}
      <NgoSidebar />

      {/* Dashboard Content */}
      <div className="flex-1 text-white p-8 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 h-screen overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">📊 NGO Dashboard Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-gray-400 text-sm mb-1">Total Posts</h2>
            <p className="text-4xl font-semibold text-blue-400">{stats.totalPosts}</p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-green-500/20 transform hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-gray-400 text-sm mb-1">Total Volunteers</h2>
            <p className="text-4xl font-semibold text-green-400">{stats.totalVolunteers}</p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transform hover:scale-[1.03] transition-all duration-300">
            <h2 className="text-gray-400 text-sm mb-1">Active / Completed</h2>
            <p className="text-3xl font-semibold text-yellow-400">
              {stats.activeOpportunities} / {stats.completedOpportunities}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Pie Chart */}
          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/20 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-5">Opportunities Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={opportunityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  dataKey="value"
                >
                  {opportunityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-5">Volunteers Joined (Last 12 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volunteerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis
                  stroke="#aaa"
                  allowDecimals={false}  // ✅ ensures only whole numbers
                  domain={[0, 'auto']}   // ✅ starts from 0 and auto scales max
                  tickCount={volunteerData.length + 1} // optional for finer spacing
                />
                <Tooltip />
                <Bar dataKey="volunteers" fill="#60A5FA" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>
    </div>

  );
};

export default NGOPage;
