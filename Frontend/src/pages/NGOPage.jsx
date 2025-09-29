import { useEffect, useState } from "react";

/**
 * NGOPage.jsx - Dark theme version
 * Requires Tailwind CSS.
 */

export default function NGOPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    ngo: "",
    description: "",
    tags: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [tab, setTab] = useState("all"); // all | upcoming | past
  const [locationFilter, setLocationFilter] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      date: form.date,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingIndex !== null) {
      const updated = [...opportunities];
      updated[editingIndex] = payload;
      setOpportunities(updated);
      showToast("Opportunity updated");
      setEditingIndex(null);
    } else {
      setOpportunities((prev) => [payload, ...prev]);
      showToast("Opportunity posted");
    }

    setForm({ title: "", location: "", date: "", ngo: "", description: "", tags: "" });
    setOpenForm(false);
  };

  const handleDelete = (i) => {
    setOpportunities((prev) => prev.filter((_, idx) => idx !== i));
    setDeleteIndex(null);
    showToast("Opportunity deleted");
  };

  const handleEdit = (i) => {
    const opp = opportunities[i];
    setForm({
      title: opp.title || "",
      location: opp.location || "",
      date: opp.date || "",
      ngo: opp.ngo || "",
      description: opp.description || "",
      tags: (opp.tags || []).join(", "),
    });
    setEditingIndex(i);
    setOpenForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = opportunities
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
      const today = new Date();
      const oppDate = new Date(opp.date + "T00:00:00");
      if (tab === "upcoming") return oppDate >= startOfDay(today);
      if (tab === "past") return oppDate < startOfDay(today);
      return true;
    })
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });

  const locations = Array.from(new Set(opportunities.map((o) => o.location).filter(Boolean)));

  useEffect(() => {
    if (opportunities.length === 0) {
      setOpportunities([
        {
          title: "Teach English to Kids",
          ngo: "Hope Foundation",
          location: "Mumbai",
          date: "2025-09-12",
          description: "Basic English classes for underprivileged children (2 hours).",
          tags: ["education", "teaching"],
        },
        {
          title: "Beach Cleanup Drive",
          ngo: "Green Earth NGO",
          location: "Chennai",
          date: "2025-10-05",
          description: "Join volunteers to clean the coastline — gloves provided.",
          tags: ["environment", "cleanup"],
        },
        {
          title: "Tree Plantation",
          ngo: "Eco Warriors",
          location: "Pune",
          date: "2025-08-01",
          description: "Plantation drive at community park, bring water bottle.",
          tags: ["environment", "trees"],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Sidebar - CTA, Stats, Filters */}
        <aside className="space-y-6 lg:sticky lg:top-20">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-[0_6px_20px_rgba(2,6,23,0.6)] border border-gray-800">
            <h2 className="text-xl font-semibold text-cyan-300">NGO Dashboard</h2>
            <p className="mt-2 text-sm text-gray-300">
              Post & manage volunteer opportunities. Keep your community engaged.
            </p>

            <div className="mt-6">
              <button
                onClick={() => {
                  setOpenForm(true);
                  setEditingIndex(null);
                  setForm({ title: "", location: "", date: "", ngo: "", description: "", tags: "" });
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500 text-black font-semibold shadow hover:bg-cyan-400 transform hover:-translate-y-0.5 transition"
              >
                ➕ Post Opportunity
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">{opportunities.length}</div>
                <div className="text-xs text-gray-400">Posted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-400">
                  {opportunities.filter((o) => {
                    if (!o.date) return 0;
                    return new Date(o.date + "T00:00:00") >= startOfDay(new Date());
                  }).length}
                </div>
                <div className="text-xs text-gray-400">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">—</div>
                <div className="text-xs text-gray-400">Vols (demo)</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 shadow-[0_6px_20px_rgba(2,6,23,0.5)] border border-gray-800">
            <h3 className="text-sm font-medium text-gray-200">Filters</h3>
            <div className="mt-3 space-y-3">
              <label className="block text-xs text-gray-400">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400"
              >
                <option value="">All locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <label className="block text-xs text-gray-400">Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTab("all")}
                  className={`flex-1 text-sm py-2 rounded-md ${
                    tab === "all" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTab("upcoming")}
                  className={`flex-1 text-sm py-2 rounded-md ${
                    tab === "upcoming" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setTab("past")}
                  className={`flex-1 text-sm py-2 rounded-md ${
                    tab === "past" ? "bg-cyan-500 text-black" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  Past
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-900 rounded-2xl p-5 shadow-[0_6px_20px_rgba(2,6,23,0.5)] border border-gray-800">
            <h4 className="text-xs text-gray-400">Tips</h4>
            <ul className="mt-2 text-sm text-gray-300 space-y-2">
              <li>Use tags to make opportunities discoverable.</li>
              <li>Keep descriptions short and practical.</li>
              <li>Use upcoming/past tabs to archive old posts.</li>
            </ul>
          </div>
        </aside>

        {/* RIGHT: Main content */}
        <main className="lg:col-span-2">
          {/* Search */}
          <div className="bg-gray-900 p-4 rounded-xl shadow-[0_6px_20px_rgba(2,6,23,0.5)] mb-6 border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title / NGO / location / tags..."
                  className="w-full rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-300">Sort:</div>
                <select
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "date") {
                      setOpportunities((s) => [...s].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));
                    } else if (v === "title") {
                      setOpportunities((s) => [...s].sort((a, b) => (a.title || "").localeCompare(b.title || "")));
                    }
                  }}
                  className="rounded-md border border-gray-700 px-3 py-2 text-sm bg-gray-800 text-white"
                >
                  <option value="date">Newest</option>
                  <option value="title">Title A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* List */}
          <section>
            {filtered.length === 0 ? (
              <div className="bg-gray-900 p-10 rounded-xl shadow-[0_6px_20px_rgba(2,6,23,0.5)] text-center border border-gray-800">
                <h3 className="text-lg font-semibold text-gray-200">No opportunities found</h3>
                <p className="mt-2 text-sm text-gray-400">Try changing filters or post a new opportunity.</p>
              </div>
            ) : (
              <ul className="grid gap-6">
                {filtered.map((opp, i) => (
                  <li
                    key={i}
                    className="bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-white truncate">{opp.title}</h3>
                        <div className="text-xs text-gray-400 whitespace-nowrap">
                          {opp.date ? niceDate(opp.date) : "Date not set"}
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mt-2">{opp.description}</p>

                      <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <span className="text-xs bg-gray-800/60 px-2 py-1 rounded-full text-gray-300 border border-gray-700">{opp.ngo}</span>
                        <span className="text-xs bg-gray-800/60 px-2 py-1 rounded-full text-gray-300 border border-gray-700">{opp.location}</span>
                        {(opp.tags || []).map((t, idx) => (
                          <span key={idx} className="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded-full border border-cyan-800">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(i)}
                        className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteIndex(i)}
                        className="px-3 py-2 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      {/* FORM MODAL */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 transform animate-scaleIn">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-lg font-semibold text-white">{editingIndex !== null ? "Edit Opportunity" : "Post Opportunity"}</h4>
              <button
                onClick={() => {
                  setOpenForm(false);
                  setEditingIndex(null);
                }}
                className="text-gray-300 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">NGO Name</label>
                  <input
                    required
                    value={form.ngo}
                    onChange={(e) => setForm({ ...form, ngo: e.target.value })}
                    className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Location</label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Date</label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400"
                  placeholder="education, environment, health"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-700 text-gray-300"
                >
                  Cancel
                </button>

                <button type="submit" className="px-4 py-2 rounded-md bg-cyan-500 text-black">
                  {editingIndex !== null ? "Update" : "Post Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 w-full max-w-md">
            <h4 className="font-semibold text-white">Delete opportunity?</h4>
            <p className="text-sm text-gray-300 mt-2">This action cannot be undone.</p>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteIndex(null)} className="px-4 py-2 rounded-md border border-gray-700 text-gray-300">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteIndex)} className="px-4 py-2 rounded-md bg-rose-600 text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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

/* ---------- helpers ---------- */

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function niceDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
