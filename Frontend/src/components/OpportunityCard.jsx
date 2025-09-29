import { useState } from "react";

/**
 * OpportunityCard.jsx - Dark theme
 * Props:
 * - index, title, ngo, location, date, description, tags (array)
 * - onApply(applicantObj)
 * - appliedCount (number)
 * - dark (bool) -> optional (we use dark styling by default in this file)
 */

export default function OpportunityCard({ index, title, ngo, location, date, description, tags = [], onApply, appliedCount = 0 }) {
  const [openApply, setOpenApply] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", note: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onApply && onApply({ name: form.name, email: form.email, note: form.note });
    setForm({ name: "", email: "", note: "" });
    setOpenApply(false);
  };

  return (
    <li className="bg-gray-900 rounded-2xl p-5 shadow-[0_6px_18px_rgba(2,6,23,0.6)] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
          <div className="text-xs text-gray-400 whitespace-nowrap">{date ? niceDate(date) : "Date TBD"}</div>
        </div>

        <p className="text-sm text-gray-300 mt-2">{description}</p>

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs bg-gray-800/60 px-2 py-1 rounded-full text-gray-300 border border-gray-700">{ngo}</span>
          <span className="text-xs bg-gray-800/60 px-2 py-1 rounded-full text-gray-300 border border-gray-700">{location}</span>
          {tags.map((t, i) => <span key={i} className="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded-full border border-cyan-800">{t}</span>)}
          <span className="ml-2 text-xs text-gray-400">• {appliedCount} applied</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setOpenApply(true)} className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-500">
          Apply
        </button>
      </div>

      {/* Apply Modal - dark */}
      {openApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 transform animate-scaleIn">
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold text-white">Apply: {title}</h4>
              <button onClick={() => setOpenApply(false)} className="text-gray-300">✕</button>
            </div>

            <form onSubmit={submit} className="mt-4 space-y-3 text-gray-200">
              <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700" />
              <input required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email" className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700" />
              <textarea value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} rows={3} placeholder="A short note (optional)" className="w-full rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-700" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpenApply(false)} className="px-4 py-2 rounded-md border border-gray-700 text-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-emerald-600 text-white">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </li>
  );
}

/* helpers */
function niceDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
