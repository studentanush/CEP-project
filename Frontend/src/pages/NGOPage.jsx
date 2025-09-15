import { useState } from "react";

export default function NGOPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpportunities([...opportunities, form]);
    setForm({ title: "", location: "", date: "" });
  };

  const handleDelete = (i) => {
    setOpportunities(opportunities.filter((_, idx) => idx !== i));
  };

  return (
    <div className="px-6 py-12 bg-gray-950 min-h-screen text-white">
      <h2 className="text-3xl font-extrabold text-cyan-400 mb-8">
        Post an Opportunity
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
      >
        <input
          type="text"
          placeholder="Opportunity Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-4 py-2 rounded-lg bg-gray-800 text-white border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border px-4 py-2 rounded-lg bg-gray-800 text-white border-gray-700"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border px-4 py-2 rounded-lg bg-gray-800 text-white border-gray-700"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition"
        >
          Post
        </button>
      </form>

      <h3 className="text-2xl font-bold text-cyan-300 mt-10">Your Opportunities</h3>
      <ul className="mt-6 space-y-3">
        {opportunities.map((opp, i) => (
          <li
            key={i}
            className="bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-800"
          >
            <span>
              {opp.title} - {opp.location} ({opp.date})
            </span>
            <button
              onClick={() => handleDelete(i)}
              className="text-red-400 hover:text-red-300"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
