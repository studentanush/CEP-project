import { useContext, useState } from "react";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import animationData from "../assets/volunteerLogin.json";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../GoogleLogin";
import { ContextAPI } from "../Context";
import animationData1 from "../assets/Loading.json";
export default function VolunteerAuth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPass, setShowPass] = useState(false);
  const { loading } = useContext(ContextAPI);
  const noop = (e) => e.preventDefault();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-neutral-900 text-white flex items-center">
      <div className="w-full max-w-6xl mx-auto p-6">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
            <Lottie
              animationData={animationData1}
              loop={true}
              style={{ height: 120, width: 120 }}
            />
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Lottie (desktop only) */}
          <div className="hidden lg:flex items-center justify-start">
            <div className="w-full max-w-xl">
              <Lottie style={{ width: "500px", height: "500px" }} animationData={animationData} loop={true} />
            </div>
          </div>

          {/* Right: auth card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 shadow-xl w-full max-w-lg mx-auto">
            {/* Header row: title + toggle buttons */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">
                  {mode === "login" ? "Sign in" : "Create account"}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  {mode === "login"
                    ? "Welcome back — sign in"
                    : "Join us — create a new account"}
                </p>
              </div>

              <div className="flex gap-2 bg-gray-800 p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`px-3 py-1 rounded-full text-sm ${mode === "login"
                    ? "bg-cyan-500 text-black"
                    : "text-gray-300"
                    }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`px-3 py-1 rounded-full text-sm ${mode === "signup"
                    ? "bg-cyan-500 text-black"
                    : "text-gray-300"
                    }`}
                >
                  Signup
                </button>
              </div>
            </div>

            {/* Google button + "or continue" divider */}
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin />
            </GoogleOAuthProvider>

            {/* <div className="flex justify-center items-center mb-6">
              <button
                type="button"
                className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-white text-black font-medium hover:shadow-md transition"
              >
                <FcGoogle size={22} />
                <span>
                  {mode === "login"
                    ? "Sign in with Google"
                    : "Sign up with Google"}
                </span>
              </button>
            </div> */}

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-800" />
              <div className="text-xs text-gray-400">or continue with</div>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Forms */}
            {mode === "login" ? (
              <form onSubmit={noop} className="space-y-5">
                <div>
                  <label className="text-xs text-gray-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full mt-1 rounded-md px-4 py-3 bg-gray-800 text-white border border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-md px-4 py-3 bg-gray-800 text-white border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                      aria-label="Toggle password"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-md bg-cyan-500 text-black font-semibold"
                >
                  Sign in
                </button>
              </form>
            ) : (
              <form onSubmit={noop} className="space-y-5">
                <div>
                  <label className="text-xs text-gray-400">Full name</label>
                  <input
                    placeholder="Your full name"
                    className="w-full mt-1 rounded-md px-4 py-3 bg-gray-800 text-white border border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full mt-1 rounded-md px-4 py-3 bg-gray-800 text-white border border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Min 8 characters"
                      className="w-full rounded-md px-4 py-3 bg-gray-800 text-white border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                      aria-label="Toggle password"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="px-4 py-2 rounded-md border border-gray-700 text-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-cyan-500 text-black font-semibold"
                  >
                    Create account
                  </button>
                </div>
              </form>
            )}

            <p className="mt-6 text-xs text-gray-500 text-center">
              By continuing you agree to our{" "}
              <span className="text-cyan-300">Terms</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
