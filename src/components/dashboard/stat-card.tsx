/**
 * One number on a dashboard.
 *
 * Replaces a full-width solid-blue bar that read as an alert rather than a
 * count, and which was the only thing above the filters.
 */
export const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);
