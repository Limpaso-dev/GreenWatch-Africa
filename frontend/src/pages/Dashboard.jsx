import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === "pending").length;
  const resolvedReports = reports.filter(r => r.status === "resolved").length;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow pt-20">

        {/* ✅ Responsive container */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
            Forest Crime Dashboard
          </h2>

          {/* ✅ Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">

            <div className="bg-white p-4 md:p-6 rounded-lg shadow text-center">
              <h3 className="text-sm md:text-lg font-semibold text-gray-600">
                Total Reports
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-green-700">
                {totalReports}
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow text-center">
              <h3 className="text-sm md:text-lg font-semibold text-gray-600">
                Pending
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                {pendingReports}
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow text-center">
              <h3 className="text-sm md:text-lg font-semibold text-gray-600">
                Resolved
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                {resolvedReports}
              </p>
            </div>

          </div>

          {/* Empty State */}
          {reports.length === 0 && (
            <p className="text-gray-500 text-sm md:text-base">
              No reports submitted yet.
            </p>
          )}

          {/* ✅ Reports Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            {reports.map((report) => (

              <div
                key={report._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >

                {report.photo && (
                  <img
                    src={`http://localhost:5000/${report.photo}`}
                    alt="report"
                    className="w-full h-40 md:h-44 object-cover"
                  />
                )}

                <div className="p-4">

                  <h3 className="font-semibold text-base md:text-lg text-green-700">
                    {report.type}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {report.description}
                  </p>

                  <div className="mt-4 text-xs md:text-sm text-gray-500 space-y-1">
                    <p>By: {report.reportedBy?.name}</p>
                    <p>Location: {report.location}</p>
                    <p>Status: {report.status}</p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Dashboard;