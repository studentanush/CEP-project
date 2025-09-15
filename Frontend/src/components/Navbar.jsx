import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/ngo", label: "NGO" },
  ];

  return (
    <nav className="bg-black/95 backdrop-blur-md text-white px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-extrabold text-cyan-400 tracking-wide">
          Impact Connect
        </Link>
        <div className="space-x-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-cyan-300 transition ${
                location.pathname === to ? "text-cyan-400 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
