import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Education() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= GET USER =================
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ================= PAY =================
  const handlePayment = async () => {
    const phone = prompt("Enter M-Pesa number (07XXXXXXXX)");

    if (!phone) return;

    try {
      setLoading(true);
      setMessage("Processing payment...");

      await API.post("/mpesa/stk", { phone });

      setMessage("📲 STK sent! Enter your PIN on phone...");

      // 🔁 Poll user status instead of full reload
      const interval = setInterval(async () => {
        await fetchUser();

        if (user?.isPremium) {
          clearInterval(interval);
          setMessage("💎 Premium unlocked!");
        }
      }, 3000);

      // Stop polling after 30s
      setTimeout(() => clearInterval(interval), 30000);

    } catch (err) {
      console.error(err.response?.data || err.message);

      const errorMsg =
        err.response?.data?.error?.errorMessage ||
        err.response?.data?.message ||
        "Payment failed";

      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8 flex-grow">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Environmental Education
        </h2>

        <p className="text-gray-600 mb-8 text-xl font-semibold">
          Learn about forest conservation, environmental protection, and how you can contribute.
        </p>

        {/* ================= FREE CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              What is Deforestation?
            </h3>
            <p className="text-gray-700">
              Deforestation is the clearing of forests due to human activities such as illegal logging and charcoal burning.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Effects of Forest Destruction
            </h3>
            <p className="text-gray-700">
              It leads to climate change, loss of biodiversity, and disruption of ecosystems.
            </p>
          </div>
        </div>

        {/* ================= PREMIUM SECTION ================= */}
        {!user?.isPremium ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🔒 Premium Content Locked
            </h3>

            <p className="text-gray-600 mb-4">
              Unlock advanced environmental training, real case studies, and expert guides.
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              {loading ? "Processing..." : "Unlock with M-Pesa (KES 100)"}
            </button>

            {message && (
              <p className="mt-4 text-sm text-gray-700">{message}</p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow border-2 border-green-600">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                🌳 Advanced Conservation Strategies
              </h3>
              <p className="text-gray-700">
                Learn how governments and NGOs combat illegal logging using technology and policy frameworks.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow border-2 border-green-600">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                🛰️ Using Technology in Conservation
              </h3>
              <p className="text-gray-700">
                Discover how satellite monitoring and reporting apps like GreenWatch improve forest protection.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Education;