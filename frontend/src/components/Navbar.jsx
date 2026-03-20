import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Safe parsing (prevents crash if null)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-700 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="font-bold text-xl">
          GreenWatch Africa
        </h1>

        <div className="flex gap-6 items-center">

          {/* Admin link */}
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-green-200">
              Admin Panel
            </Link>
          )}

          <Link to="/home" className="hover:text-green-200">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-green-200">
            Dashboard
          </Link>

          <Link to="/report" className="hover:text-green-200">
            Report Crime
          </Link>

          <Link to="/my-reports" className="hover:text-green-200">
            My Reports
          </Link>

          {/* Admin badge */}
          {user?.role === "admin" && (
            <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded">
              Admin
            </span>
          )}

          <Link to="/education" className="hover:text-green-200">
            Education
          </Link>

          <button
            onClick={logout}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-500"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;