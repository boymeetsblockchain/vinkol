/**
 * A person's picture, or their initial.
 *
 * The fallback used to be `/assets/placeholder.png` — the product placeholder
 * from the shop listings, which is a grey image icon and reads as a failed
 * load inside a circle. Before that it was no fallback at all, which rendered
 * a broken-image icon for every user without a picture.
 */
export const Avatar = ({
  src,
  name,
  className = "h-10 w-10",
  textClass = "text-sm",
}: {
  src?: string | null;
  name?: string;
  /** Carries the size. */
  className?: string;
  textClass?: string;
}) =>
  src ? (
    <img
      src={src}
      alt=""
      className={`${className} rounded-full object-cover border border-gray-200 bg-gray-100`}
    />
  ) : (
    <span
      className={`${className} ${textClass} rounded-full bg-blue-50 border border-blue-100 text-[var(--color-blue-primary)] font-semibold flex items-center justify-center select-none`}
      aria-hidden="true"
    >
      {(name?.trim()?.[0] ?? "?").toUpperCase()}
    </span>
  );
