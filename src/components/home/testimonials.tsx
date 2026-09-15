import { Star } from "lucide-react";

import { contentFor } from "@/lib/markets";
import { Country } from "@/lib/markets/types";

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export const Testimonials = ({ country }: { country: Country }) => {
  const { testimonials, testimonialsHeading, ratingSummary } =
    contentFor(country);

  // A market with no customers yet has nothing true to put here. Rendering
  // nothing is the honest option; inventing quotes is not.
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-[#F7F8FA] w-full py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
            Reviews
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {testimonialsHeading}
            </h2>
            {ratingSummary && (
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-3 w-fit shadow-sm flex-shrink-0">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 ml-1">
                  {ratingSummary.score}
                </span>
                <span className="text-sm text-gray-400">
                  · {ratingSummary.count}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <Stars count={t.rating} />

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div
                  className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
