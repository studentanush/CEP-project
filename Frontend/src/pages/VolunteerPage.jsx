import { useEffect, useState } from "react";
import OpportunityCard from "../components/OpportunityCard";
import { useLocation } from "react-router-dom";

/**
 * VolunteerPage.jsx - Dark theme
 * Requires Tailwind CSS. Uses animate-fadeIn / animate-scaleIn (CSS provided below).
 */

export default function VolunteerPage() {
  const location = useLocation();
  const initial = [
    { title: "Teach English to Kids", ngo: "Hope Foundation", location: "Mumbai", date: "2025-09-12", description: "2-hour weekend classes for children.", tags: ["education"] },
    { title: "Beach Cleanup Drive", ngo: "Green Earth NGO", location: "Chennai", date: "2025-09-15", description: "Help clean the coastline. Gloves provided.", tags: ["environment","cleanup"] },
    { title: "Tree Plantation", ngo: "Eco Warriors", location: "Pune", date: "2025-09-20", description: "Plant trees in the community park.", tags: ["environment","trees"] },
  ];
  const [userInfo,setUserInfo] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all"); // all | upcoming | past
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date | title
  const [applied, setApplied] = useState([]); // {oppIndex, name, email, note, appliedAt}
  const [toast, setToast] = useState({ show: false, msg: "" });

  useEffect(() => setOpportunities(initial), []);
  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, [location]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2400);
  };

  const handleApply = (oppIndex, applicant) => {
    setApplied((s) => [{ oppIndex, ...applicant, appliedAt: new Date().toISOString() }, ...s]);
    showToast("Application submitted — thanks!");
  };

  const filtered = opportunities
    .map((opp, idx) => ({ ...opp, __idx: idx }))
    .filter((opp) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (opp.title || "").toLowerCase().includes(q) ||
        (opp.ngo || "").toLowerCase().includes(q) ||
        (opp.location || "").toLowerCase().includes(q) ||
        (opp.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    })
    .filter((opp) => (locationFilter ? opp.location === locationFilter : true))
    .filter((opp) => {
      if (tab === "all") return true;
      if (!opp.date) return tab === "all";
      const today = startOfDay(new Date());
      const d = startOfDay(new Date(opp.date + "T00:00:00"));
      if (tab === "upcoming") return d >= today;
      if (tab === "past") return d < today;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        if (a.date && b.date) return new Date(a.date) - new Date(b.date);
        if (a.date) return -1;
        if (b.date) return 1;
        return 0;
      }
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      return 0;
    });

  const locations = Array.from(new Set(opportunities.map((o) => o.location).filter(Boolean)));
  const appliedCountFor = (idx) => applied.filter((a) => a.oppIndex === idx).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Sidebar */}
        
        <aside className="space-y-6 lg:sticky lg:top-20">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-[0_8px_30px_rgba(2,6,23,0.6)] border border-gray-800">
            <h1 className="text-2xl  text-cyan-300 font-extrabold mb-2">😃Welcome {userInfo?.name}... </h1>
            <h2 className="text-xl font-semibold text-cyan-300">Volunteer Opportunities</h2>
            <p className="mt-2 text-sm text-gray-300">Discover ways to help — search and apply in seconds.</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">{opportunities.length}</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-400">{opportunities.filter(o => o.date && new Date(o.date+"T00:00:00") >= startOfDay(new Date())).length}</div>
                <div className="text-xs text-gray-400">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{applied.length}</div>
                <div className="text-xs text-gray-400">Applications</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 shadow-[0_8px_30px_rgba(2,6,23,0.5)] border border-gray-800">
            <h3 className="text-sm font-medium text-gray-200">Filters</h3>
            <div className="mt-3 space-y-3">
              <label className="block text-xs text-gray-400">Location</label>
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400">
                <option value="">All locations</option>
                {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
              </select>

              <label className="block text-xs text-gray-400">Status</label>
              <div className="flex gap-2">
                <button onClick={() => setTab("all")} className={`flex-1 text-sm py-2 rounded-md ${tab === "all" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"}`}>All</button>
                <button onClick={() => setTab("upcoming")} className={`flex-1 text-sm py-2 rounded-md ${tab === "upcoming" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"}`}>Upcoming</button>
                <button onClick={() => setTab("past")} className={`flex-1 text-sm py-2 rounded-md ${tab === "past" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"}`}>Past</button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-900 rounded-2xl p-5 shadow-[0_8px_30px_rgba(2,6,23,0.5)] border border-gray-800">
            <h4 className="text-xs text-gray-400">Tips</h4>
            <ul className="mt-2 text-sm text-gray-300 space-y-2">
              <li>Sort by date to plan your schedule.</li>
              <li>Filter by location to find nearby opportunities.</li>
              <li>Use tags in search to find specific causes.</li>
            </ul>
          </div>
        </aside>

        {/* RIGHT: Main content */}
        <main className="lg:col-span-2">
          {/* Search + sort */}
          <div className="bg-gray-900 p-4 rounded-xl shadow mb-6 border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title / NGO / location / tags..." className="w-full rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400" />
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-300">Sort:</div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-md border border-gray-700 px-3 py-2 text-sm bg-gray-800 text-white">
                  <option value="date">Date</option>
                  <option value="title">Title A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Opportunities list */}
          <section>
            {filtered.length === 0 ? (
              <div className="bg-gray-900 p-10 rounded-xl shadow-[0_8px_30px_rgba(2,6,23,0.5)] text-center border border-gray-800">
                <h3 className="text-lg font-semibold text-gray-200">No opportunities found</h3>
                <p className="mt-2 text-sm text-gray-400">Try adjusting filters or check back later.</p>
              </div>
            ) : (
              <ul className="grid gap-6">
                {filtered.map((opp) => (
                  <OpportunityCard
                    key={opp.__idx}
                    index={opp.__idx}
                    title={opp.title}
                    ngo={opp.ngo}
                    location={opp.location}
                    date={opp.date}
                    description={opp.description}
                    tags={opp.tags}
                    onApply={(applicant) => handleApply(opp.__idx, applicant)}
                    appliedCount={appliedCountFor(opp.__idx)}
                    dark
                  />
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div className="fixed right-6 bottom-6 z-50">
          <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-700">
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}

/* helpers */
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
