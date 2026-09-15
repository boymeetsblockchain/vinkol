/**
 * One settings section.
 *
 * The settings screens separated their sections with a top border and a large
 * margin, which left three unrelated forms reading as one long column.
 */
export const SettingsCard = ({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description?: string;
  /** Status pill, shown on the title row. */
  badge?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {badge}
    </div>
    {description && (
      <p className="text-sm text-gray-500 mt-1 mb-5 max-w-2xl">{description}</p>
    )}
    {!description && <div className="mb-5" />}
    {children}
  </section>
);
