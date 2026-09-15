/**
 * A dashboard page's title.
 *
 * The wallet screens already looked like this; the order lists had no heading
 * at all, so they opened on a coloured bar and a row of filters with nothing
 * saying what the page was.
 */
export const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
  </div>
);
