import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-green-50">

      <Navbar />

      {/* Main content */}
      <div className="flex-grow pt-24">

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">
            Welcome to GreenWatch Africa
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A digital platform for reporting environmental crimes, monitoring forest activities,
            and promoting conservation awareness across Africa.
          </p>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Report */}
            <div
              onClick={() => navigate("/report")}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Report Crime
              </h3>
              <p className="text-sm text-gray-600">
                Submit environmental crime reports quickly and securely.
              </p>
            </div>

            {/* My Reports */}
            <div
              onClick={() => navigate("/my-reports")}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                My Reports
              </h3>
              <p className="text-sm text-gray-600">
                Track and manage all your submitted reports.
              </p>
            </div>

            {/* Dashboard */}
            <div
              onClick={() => navigate("/dashboard")}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                View insights, analytics, and environmental trends.
              </p>
            </div>

            {/* Education */}
            <div
              onClick={() => navigate("/education")}
              className="bg-white p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                Education
              </h3>
              <p className="text-sm text-gray-600">
                Learn about conservation and protecting ecosystems.
              </p>
            </div>

          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Home;