import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative text-center py-28 bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold mb-6 drop-shadow-lg"
      >
        Connecting Volunteers with NGOs 🌍✨
      </motion.h1>
      <p className="text-lg max-w-xl mx-auto text-gray-300 mb-8">
        Join hands to create meaningful change in your community.  
        Every small action counts!
      </p>
      <div className="space-x-4">
        <Link
          to="/volunteer"
          className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl shadow-lg hover:bg-cyan-400 transition"
        >
          I Want to Volunteer
        </Link>
        <Link
          to="/ngo"
          className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg hover:bg-gray-200 transition"
        >
          I Represent an NGO
        </Link>
      </div>
    </section>
  );
}
