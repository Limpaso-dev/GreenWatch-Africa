import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReportCard from "../components/ReportCard";

function Admin() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [savingId, setSavingId] = useState("");

  const fetchReports = async () => {
    try {
      setErrorMessage("");
      const res = await API.get("/reports/all");
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
    if (!window.confirm("Delete this report?")) {
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

  const handleStatusChange = async (id, status) => {
    try {
      setSavingId(id);
      await API.put(`/reports/${id}/status`, { status });
      setReports((prev) =>
        prev.map((report) =>
          report._id === id ? { ...report, status } : report
        )
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update report status"
      );
    } finally {
      setSavingId("");
    }
  };

  const pendingCount = reports.filter((report) => report.status === "pending").length;
  const resolvedCount = reports.filter((report) => report.status === "resolved").length;

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f5fbf6,_#edf7ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[32px] bg-brand-900 px-6 py-8 text-white shadow-soft sm:px-8">
            <p className="text-sm uppercase tracking-[0.35em] text-green-100/70">
              Admin Panel
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              Review, update, and manage incoming reports
            </h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] bg-white/8 p-4">
                <p className="text-sm text-green-100/80">All Reports</p>
                <p className="mt-2 text-3xl font-semibold">{reports.length}</p>
              </div>
              <div className="rounded-[24px] bg-white/8 p-4">
                <p className="text-sm text-green-100/80">Pending</p>
                <p className="mt-2 text-3xl font-semibold">{pendingCount}</p>
              </div>
              <div className="rounded-[24px] bg-white/8 p-4">
                <p className="text-sm text-green-100/80">Resolved</p>
                <p className="mt-2 text-3xl font-semibold">{resolvedCount}</p>
              </div>
            </div>
          </section>

          {loading && (
            <div className="mt-8 rounded-[28px] border border-brand-100 bg-white p-6 text-slate-500 shadow-soft">
              Loading admin queue...
            </div>
          )}

          {!loading && errorMessage && (
            <div className="mt-8 rounded-[28px] bg-red-50 p-6 text-red-600 shadow-soft">
              {errorMessage}
            </div>
          )}

          {!loading && !errorMessage && reports.length === 0 && (
            <div className="mt-8 rounded-[28px] border border-dashed border-brand-200 bg-white/80 p-10 text-center text-slate-500">
              No reports found.
            </div>
          )}

          {!loading && !errorMessage && reports.length > 0 && (
            <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                  showReporter
                  showDelete
                  onDelete={handleDelete}
                  statusAction={
                    <select
                      value={report.status}
                      onChange={(event) =>
                        handleStatusChange(report._id, event.target.value)
                      }
                      disabled={savingId === report._id}
                      className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  }
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

export default Admin;
