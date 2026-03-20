import { Link } from "react-router-dom";
import forestHero from "../assets/images/heroimage.jpg";
import Footer from "../components/Footer";
import { useState } from "react";

function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <div className="relative flex-grow">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${forestHero})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* ✅ Responsive Navbar */}
        <nav className="fixed top-0 left-0 z-20 w-full text-white bg-black/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

            <h1 className="font-bold text-lg md:text-xl">
              GreenWatch Africa
            </h1>

            {/* Desktop */}
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Register
              </Link>
            </div>

            {/* Mobile button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* ✅ Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 pt-24">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            Protect Forests. <br className="hidden sm:block" />
            Report Illegal Activities.
          </h1>

          <p className="text-white text-sm sm:text-base md:text-lg max-w-xl mb-6 md:mb-8">
            GreenWatch Africa empowers communities to monitor, report, and protect forests across Africa.
          </p>

          {/* ✅ CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

            <Link
              to="/register"
              className="bg-green-600 px-6 py-3 rounded font-semibold hover:bg-green-500 transition w-full sm:w-auto text-center"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition w-full sm:w-auto text-center"
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