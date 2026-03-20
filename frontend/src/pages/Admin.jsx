import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";

function Admin() {
  const [reports, setReports] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Protect route
  if (user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/admin/reports");
      setReports(res.data); // ✅ FIXED (backend returns array)
    } catch (err) {
      console.log("Error fetching reports:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/reports/${id}`);
      fetchReports(); // refresh after delete
    } catch (err) {
      console.log("Error deleting report:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow pt-20 max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Admin Panel 🛠
        </h2>

        {/* ✅ Handle empty state */}
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {report.photo && (
                  <img
                    src={`http://localhost:5000/${report.photo}`}
                    alt="report"
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-bold text-green-700">
                    {report.type}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {report.description}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {report.location}
                  </p>

                  <button
                    onClick={() => handleDelete(report._id)}
                    className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Admin;