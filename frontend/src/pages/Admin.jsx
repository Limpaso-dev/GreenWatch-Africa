import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Admin() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data.reports);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await API.delete(`/reports/${id}`);
      setReports(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Update status
  const handleStatus = async (id, status) => {
    try {
      await API.put(`/reports/${id}/status`, { status });
      fetchReports();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Admin Panel
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {reports.map((report) => (

            <div key={report._id} className="bg-white p-4 rounded shadow">

              <h3 className="font-bold text-green-700">
                {report.type}
              </h3>

              <p className="text-sm text-gray-600">
                {report.location}
              </p>

              <p className="my-2">{report.description}</p>

              <p className="text-sm">
                Status: <strong>{report.status}</strong>
              </p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleStatus(report._id, "resolved")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Mark Resolved
                </button>

                <button
                  onClick={() => handleStatus(report._id, "pending")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Mark Pending
                </button>

                <button
                  onClick={() => handleDelete(report._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Admin;