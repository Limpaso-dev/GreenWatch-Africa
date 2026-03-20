import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-700 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="font-bold text-lg md:text-xl">
          GreenWatch Africa
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-green-200">
              Admin Panel
            </Link>
          )}

          <Link to="/home" className="hover:text-green-200">Home</Link>
          <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
          <Link to="/report" className="hover:text-green-200">Report</Link>
          <Link to="/my-reports" className="hover:text-green-200">Reports</Link>
          <Link to="/education" className="hover:text-green-200">Education</Link>

          {user?.role === "admin" && (
            <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
              Admin
            </span>
          )}

          <button
            onClick={logout}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-500"
          >
            Logout
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-green-800 px-4 pb-4 flex flex-col gap-3">

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin Panel
            </Link>
          )}

          <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/report" onClick={() => setOpen(false)}>Report</Link>
          <Link to="/my-reports" onClick={() => setOpen(false)}>My Reports</Link>
          <Link to="/education" onClick={() => setOpen(false)}>Education</Link>

          {user?.role === "admin" && (
            <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded w-fit">
              Admin
            </span>
          )}

          <button
            onClick={logout}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 w-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;