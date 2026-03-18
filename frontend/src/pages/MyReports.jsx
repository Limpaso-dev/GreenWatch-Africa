import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch reports
  const fetchReports = async () => {
    try {
      const res = await API.get("/reports", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReports(res.data.reports);
    } catch (error) {
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Delete report
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await API.delete(`/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Refresh list
      setReports((prev) => prev.filter((r) => r._id !== id));

    } catch (error) {
      alert("Failed to delete report");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          My Reports
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white p-4 rounded shadow"
              >
                <h3 className="text-lg font-semibold text-green-800">
                  {report.type}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  {report.location}
                </p>

                <p className="mb-3">{report.description}</p>

                {/* Image */}
                {report.photo && (
                  <img
                    src={`http://localhost:5000/${report.photo}`}
                    alt="report"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}

                {/* Status */}
                <p className="text-sm mb-2">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {report.status}
                  </span>
                </p>

                {/* Delete button (admin OR owner) */}
                {(user?.role === "admin" ||
                  report.reportedBy?._id === user?._id) && (
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default MyReports;