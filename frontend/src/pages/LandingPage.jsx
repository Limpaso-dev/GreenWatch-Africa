import { Link } from "react-router-dom";
import forestHero from "../assets/images/heroimage.jpg";

function LandingPage() {
  return (
    <div className="min-h-screen relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${forestHero})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-20 w-full flex justify-between items-center p-4 text-white bg-black/30 backdrop-blur-sm">
        <h1 className="font-bold text-xl">🌳 GreenWatch Africa</h1>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-500 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-white px-4 py-1 rounded hover:bg-green-600 hover:text-white transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 pt-24">
        {/* pt-24 adds top padding so hero text is below fixed navbar */}
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          Protect Forests. Report Illegal Activities.
        </h1>
        <p className="text-white text-lg max-w-xl mb-8 drop-shadow-md">
          GreenWatch Africa is your platform to monitor, report, and protect forests across Africa. Join our community today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">  
        </div>
      </div>
    </div>
  );
}

export default LandingPage;