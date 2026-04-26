import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportCrime() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!type || !description || !location) {
      setMessage("All fields except photo are required.");
      return;
    }

    const formData = new FormData();
    formData.append("type", type.trim());
    formData.append("description", description.trim());
    formData.append("location", location.trim());

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      setLoading(true);
      await API.post("/reports", formData);
      setMessage("Report submitted successfully.");
      setType("");
      setDescription("");
      setLocation("");
      setPhoto(null);
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Server error while submitting report"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f5fbf6,_#edf7ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[32px] bg-brand-700 px-6 py-8 text-white shadow-soft sm:px-8">
              <p className="text-sm uppercase tracking-[0.35em] text-green-100/75">
                Report Crime
              </p>
              <h1 className="mt-4 text-3xl font-semibold">
                Capture the details while the incident is fresh
              </h1>
              <p className="mt-4 text-sm leading-7 text-green-100/85">
                Add a clear description, location, and optional image so the Admin receives complete evidence for follow-up.
              </p>

              <div className="mt-8 space-y-4 rounded-[28px] bg-white/8 p-5">
                <p className="text-sm font-semibold text-white">Helpful tips</p>
                <ul className="space-y-3 text-sm text-green-100/85">
                  <li>Use a specific crime type such as illegal logging or charcoal burning.</li>
                  <li>Describe what happened, when it happened, and who was involved if known.</li>
                  <li>Attach a clear image only if it is safe to do so.</li>
                </ul>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[32px] border border-brand-100 bg-white p-6 shadow-soft sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-brand-900">
                Incident details
              </h2>

              <div className="mt-6 grid gap-4">
                <input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Crime type, e.g. Illegal logging"
                  className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue and any relevant context..."
                  rows={6}
                  className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
                />

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location, e.g. Ongata Rongai near Maasai Mall"
                  className="w-full rounded-2xl border border-brand-100 bg-brand-50/40 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
                />

                <label className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 px-4 py-4 text-sm text-slate-600">
                  <span className="mb-2 block font-medium text-brand-900">
                    Optional photo evidence
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                </label>
              </div>

              {message && (
                <div className="mt-5 rounded-2xl bg-earth-100 px-4 py-3 text-sm text-earth-700">
                  {message}
                </div>
              )}

              <button
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReportCrime;
