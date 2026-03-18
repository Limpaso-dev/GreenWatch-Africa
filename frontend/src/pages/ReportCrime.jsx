import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ReportCrime() {

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!type || !description || !location) {
      alert("All fields except photo are required");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("description", description);
    formData.append("location", location);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      setLoading(true);

      const res = await API.post("/reports", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("SUCCESS:", res.data);

      alert("Report submitted successfully");

      // reset form
      setType("");
      setDescription("");
      setLocation("");
      setPhoto(null);

    } catch (err) {
      console.error("FULL ERROR:", err.response);

      alert(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Server error while submitting report"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50">

      <Navbar />

      <div className="flex justify-center p-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-xl"
        >

          <h2 className="text-3xl font-bold mb-6 text-green-700">
            Report Forest Crime
          </h2>

          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Crime Type (e.g. Illegal logging)"
            className="w-full border p-2 mb-4 rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            rows={4}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (e.g. Ongata Rongai near Maasai Mall)"
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-4"
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReportCrime;