import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  // ✅ Safe parsing (prevents crash if null)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Admin-only protection
  if (adminOnly) {
    // If no user OR not admin → block
    if (!user || user.role !== "admin") {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;