import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReportCard from "../components/ReportCard";

function Dashboard() {
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
        error.response?.data?.message || "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalReports = reports.length;
  const pendingReports = reports.filter((report) => report.status === "pending").length;
  const resolvedReports = reports.filter((report) => report.status === "resolved").length;

  const stats = [
    { label: "Total Reports", value: totalReports, tone: "text-brand-700" },
    { label: "Pending Cases", value: pendingReports, tone: "text-amber-600" },
    { label: "Resolved Cases", value: resolvedReports, tone: "text-brand-600" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,_#f5fbf6,_#edf6ef)]">
      <Navbar />

      <main className="flex-1 px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[32px] bg-brand-700 px-6 py-8 text-white shadow-soft sm:px-8">
            <p className="text-sm uppercase tracking-[0.35em] text-green-100/80">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Forest crime overview</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-green-100/85">
              Monitor the reports you have submitted, track case resolution, and
              keep a quick pulse on field activity.
            </p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-brand-100 bg-white p-6 shadow-soft"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className={`mt-3 text-4xl font-semibold ${stat.tone}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-brand-900">
                  Recent reports
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Your latest submissions appear here with status updates from the backend.
                </p>
              </div>
            </div>

            {loading && (
              <div className="rounded-[28px] border border-brand-100 bg-white p-6 text-slate-500 shadow-soft">
                Loading dashboard...
              </div>
            )}

            {!loading && errorMessage && (
              <div className="rounded-[28px] bg-red-50 p-6 text-red-600 shadow-soft">
                {errorMessage}
              </div>
            )}

            {!loading && !errorMessage && reports.length === 0 && (
              <div className="rounded-[28px] border border-dashed border-brand-200 bg-white/70 p-10 text-center text-slate-500">
                No reports submitted yet.
              </div>
            )}

            {!loading && !errorMessage && reports.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {reports.map((report) => (
                  <ReportCard key={report._id} report={report} showReporter />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
