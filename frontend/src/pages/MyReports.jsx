import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReportCard from "../components/ReportCard";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchReports = async () => {
    try {
      setErrorMessage("");
      const res = await API.get("/reports");
      setReports(res.data.reports || []);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to fetch reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    try {
      await API.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((report) => report._id !== id));
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to delete report"
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f5fbf6,_#edf7ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <section className="flex flex-col gap-4 rounded-[32px] bg-white p-6 shadow-soft sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-600">
                My Reports
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-brand-900">
                Track every report you have submitted
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Follow the case status, check supporting evidence, and remove reports you no longer want to keep.
              </p>
            </div>
            <div className="rounded-[24px] bg-brand-50 px-5 py-4 text-brand-700">
              <p className="text-sm">Total reports</p>
              <p className="mt-1 text-3xl font-semibold">{reports.length}</p>
            </div>
          </section>

          {loading && (
            <div className="mt-8 rounded-[28px] border border-brand-100 bg-white p-6 text-slate-500 shadow-soft">
              Loading your reports...
            </div>
          )}

          {!loading && errorMessage && (
            <div className="mt-8 rounded-[28px] bg-red-50 p-6 text-red-600 shadow-soft">
              {errorMessage}
            </div>
          )}

          {!loading && !errorMessage && reports.length === 0 && (
            <div className="mt-8 rounded-[28px] border border-dashed border-brand-200 bg-white/70 p-10 text-center text-slate-500">
              No reports found yet.
            </div>
          )}

          {!loading && !errorMessage && reports.length > 0 && (
            <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  showDelete
                  onDelete={handleDelete}
                />
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyReports;
