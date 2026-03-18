import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Welcome to GreenWatch Africa 🌍
        </h2>

        <p className="text-gray-600 mb-10">
          A digital platform for reporting environmental crimes, monitoring forest activities, and promoting conservation awareness.
        </p>

        {/* Navigation cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Report */}
          <div
            onClick={() => navigate("/report")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Report Crime
            </h3>
            <p className="text-sm text-gray-600">
              Submit environmental crime reports.
            </p>
          </div>

          {/* My Reports */}
          <div
            onClick={() => navigate("/my-reports")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              My Reports
            </h3>
            <p className="text-sm text-gray-600">
              View and manage submitted reports.
            </p>
          </div>

          {/* Dashboard */}
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Dashboard
            </h3>
            <p className="text-sm text-gray-600">
              View analytics and trends.
            </p>
          </div>

          {/* Education */}
          <div
            onClick={() => navigate("/education")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">
              Education
            </h3>
            <p className="text-sm text-gray-600">
              Learn about environmental conservation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;