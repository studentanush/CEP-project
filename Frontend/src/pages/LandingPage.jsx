import HeroSection from "../components/HeroSection";

export default function LandingPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Why Section */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-6">
          Why Impact Connect?
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
          We bridge the gap between passionate volunteers and NGOs in need.  
          Our mission is to make volunteering accessible, transparent, and impactful.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-extrabold text-cyan-400 text-center mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-cyan-400/30 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">1. Sign Up</h3>
            <p className="text-gray-300">Volunteers and NGOs can create profiles to join our community.</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-cyan-400/30 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">2. Connect</h3>
            <p className="text-gray-300">NGOs post opportunities and volunteers apply with a click.</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-cyan-400/30 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">3. Make Impact</h3>
            <p className="text-gray-300">Together we create change through meaningful volunteering work.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 text-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-12">
          Voices of Change
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
            <p className="text-gray-300 italic">
              "Through Impact Connect, I found a platform to contribute my skills.
              Teaching kids every weekend has been the most rewarding experience!"
            </p>
            <h4 className="mt-4 font-semibold text-cyan-300">— Riya, Volunteer</h4>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
            <p className="text-gray-300 italic">
              "We connected with over 50 volunteers in a month.  
              This platform is a blessing for NGOs like ours."
            </p>
            <h4 className="mt-4 font-semibold text-cyan-300">— Green Earth NGO</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
