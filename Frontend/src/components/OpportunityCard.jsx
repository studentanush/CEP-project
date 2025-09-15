export default function OpportunityCard({ title, ngo, location, date }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-6 hover:shadow-cyan-400/40 hover:scale-[1.02] transition">
      <h3 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h3>
      <p className="text-gray-400">By: {ngo}</p>
      <p className="text-gray-400">📍 {location}</p>
      <p className="text-gray-400">🗓 {date}</p>
      <button className="mt-5 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition">
        Apply Now 🚀
      </button>
    </div>
  );
}
