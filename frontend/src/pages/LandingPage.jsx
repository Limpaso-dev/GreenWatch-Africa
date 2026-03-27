import { Link } from "react-router-dom";
import forestHero from "../assets/images/heroimage.jpg";
import Footer from "../components/Footer";
import { useState } from "react";

function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[75vh]">

        {/* Image */}
        <img
          src={forestHero}
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 z-20 w-full text-white bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

            <h1 className="font-bold text-xl tracking-wide">
              GreenWatch Africa
            </h1>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="px-4 py-2 hover:bg-white/10 rounded transition">
                Login
              </Link>
              <Link to="/register" className="bg-green-600 px-5 py-2 rounded-md font-semibold hover:bg-green-500 transition shadow">
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>

          {open && (
            <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-black/80">
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Get Started</Link>
            </div>
          )}
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 pt-24">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
            Protect Forests.
            <span className="block text-green-400 mt-1">
              Report Illegal Activities.
            </span>
          </h1>

          <p className="text-gray-200 text-sm md:text-base max-w-xl mb-6">
            Empowering communities across Africa to monitor and protect forests using technology.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              to="/register"
              className="bg-green-600 px-6 py-2 rounded-md font-medium hover:bg-green-500 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;