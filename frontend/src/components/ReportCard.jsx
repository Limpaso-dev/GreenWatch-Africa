import { getMediaUrl } from "../services/api";

function ReportCard({
  report,
  showReporter = false,
  showDelete = false,
  onDelete,
  statusAction = null,
}) {
  const imageUrl = getMediaUrl(report.photo);
  const formattedDate = report.createdAt
    ? new Date(report.createdAt).toLocaleDateString()
    : "Recent";

  const statusStyles =
    report.status === "resolved"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  return (
    <article className="overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-soft transition hover:-translate-y-1">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={report.type}
          className="h-52 w-full object-cover"
        />
      )}

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
              {report.type}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-brand-900">
              {report.location}
            </h3>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}>
            {report.status}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{report.description}</p>

        <div className="grid gap-2 text-sm text-slate-500">
          {showReporter && <p>Reported by: {report.reportedBy?.name || "Unknown"}</p>}
          <p>Date: {formattedDate}</p>
          {report.reportedBy?.email && showReporter && (
            <p>Email: {report.reportedBy.email}</p>
          )}
        </div>

        {(showDelete || statusAction) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {statusAction}
            {showDelete && (
              <button
                onClick={() => onDelete?.(report._id)}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ReportCard;
