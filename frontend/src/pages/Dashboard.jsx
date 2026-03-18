import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data.reports);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Derived stats (for visualization requirement)
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === "pending").length;
  const resolvedReports = reports.filter(r => r.status === "resolved").length;

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Forest Crime Dashboard
        </h2>

        {/* 🔥 Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Reports</h3>
            <p className="text-3xl font-bold text-green-700">{totalReports}</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingReports}</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">{resolvedReports}</p>
          </div>

        </div>

        {/* Reports list */}
        {reports.length === 0 && (
          <p className="text-gray-500">No reports submitted yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reports.map((report) => (

            <div
              key={report._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >

              {report.photo && (
                <img
                  src={`http://localhost:5000/${report.photo}`}
                  alt="report"
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">

                <h3 className="font-bold text-lg text-green-700">
                  {report.type}
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {report.description}
                </p>

                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>Reported by: {report.reportedBy?.name}</p>
                  <p>Location: {report.location}</p>
                  <p>Status: {report.status}</p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;