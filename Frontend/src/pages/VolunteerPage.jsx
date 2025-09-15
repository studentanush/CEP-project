import { useState } from "react";
import OpportunityCard from "../components/OpportunityCard";

export default function VolunteerPage() {
  const allOpportunities = [
    { title: "Teach English to Kids", ngo: "Hope Foundation", location: "Mumbai", date: "12th Sep 2025" },
    { title: "Beach Cleanup Drive", ngo: "Green Earth NGO", location: "Chennai", date: "15th Sep 2025" },
    { title: "Tree Plantation", ngo: "Eco Warriors", location: "Pune", date: "20th Sep 2025" },
  ];

  const [search, setSearch] = useState("");

  const filtered = allOpportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-12 bg-gray-950 min-h-screen text-white">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        Available Opportunities
      </h2>

      <input
        type="text"
        placeholder="Search by title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full max-w-md px-4 py-2 rounded-lg border bg-gray-900 text-white border-gray-700"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((opp, i) => (
          <OpportunityCard key={i} {...opp} />
        ))}
      </div>
    </div>
  );
}
