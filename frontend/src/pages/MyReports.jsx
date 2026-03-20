import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH REPORTS =================
  const fetchReports = async () => {
    try {
      const res = await API.get("/reports"); // ✅ token auto-attached
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

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await API.delete(`/reports/${id}`); // ✅ no manual headers

      // update UI instantly
      setReports((prev) => prev.filter((r) => r._id !== id));

    } catch (error) {
      alert("Failed to delete report");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">

      <Navbar />

      <div className="flex-grow p-6 max-w-6xl mx-auto">

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
                  <span
                    className={`font-semibold ${
                      report.status === "resolved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {report.status}
                  </span>
                </p>

                {/* Delete (owner OR admin) */}
                {(user?.role === "admin" ||
                  report.reportedBy?._id === user?._id) && (
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}

              </div>

            ))}

          </div>
        )}

      </div>

      <Footer />

    </div>
  );
}

export default MyReports;