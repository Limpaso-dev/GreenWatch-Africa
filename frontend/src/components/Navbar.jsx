import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/GreenWatch Logo.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/report", label: "Report Crime" },
    { to: "/my-reports", label: "My Reports" },
    { to: "/education", label: "Education" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-brand-700/95 text-white shadow-soft backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <img
              src={logo}
              alt="GreenWatch Africa logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <p className="font-semibold tracking-wide">GreenWatch Africa</p>
            <p className="text-xs text-green-100/80">
              Community crime reporting
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`rounded-full px-4 py-2 text-sm transition ${
                location.pathname === "/admin"
                  ? "bg-earth-400 text-brand-900"
                  : "bg-white/8 hover:bg-white/16"
              }`}
            >
              Admin Panel
            </Link>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-4 py-2 text-sm transition ${
                location.pathname === link.to
                  ? "bg-white text-brand-700"
                  : "hover:bg-white/12"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user && (
            <div className="rounded-full bg-white/10 px-4 py-2 text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-green-100/80">
                {user.role === "admin" ? "Administrator" : "Reporter"}
              </p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-green-50"
          >
            Logout
          </button>
        </div>

        <button
          className="rounded-xl border border-white/20 p-2 text-2xl lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-900/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm"
              >
                Admin Panel
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  location.pathname === link.to
                    ? "bg-white text-brand-700"
                    : "bg-white/8"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-brand-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
