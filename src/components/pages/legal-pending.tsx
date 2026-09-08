import Link from "next/link";

import { contentFor } from "@/lib/markets";
import { Country } from "@/lib/markets/types";

/**
 * Placeholder for a market's legal pages while counsel drafts them.
 *
 * The Nigerian documents are not reused here on purpose: they are governed by
 * Nigerian law, name the Lagos Multi Door Courthouse for disputes and cite the
 * Nigeria Data Protection Act. Serving them to Canadian users would be both
 * wrong and unenforceable.
 */
export const LegalPendingPage = ({
  country,
  title,
}: {
  country: Country;
  title: string;
}) => {
  const { brandName, contact } = contentFor(country);

  return (
    <section className="min-h-[60vh] max-w-3xl mx-auto px-6 md:px-20 py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">
        {title}
      </h1>
      <p className="text-gray-500 leading-relaxed mb-4">
        {brandName} is preparing {title.toLowerCase()} for Canada. Because these
        terms are governed by Canadian law, they are being drafted for this
        market rather than adapted from our Nigerian documents.
      </p>
      <p className="text-gray-500 leading-relaxed mb-8">
        If you need a copy before it is published here, or have a question about
        how we handle your data, contact us at{" "}
        <a
          href={`mailto:${contact.email}`}
          className="text-blue-primary hover:underline underline-offset-4"
        >
          {contact.email}
        </a>
        .
      </p>
      <Link
        href="/ca"
        className="text-blue-primary text-sm font-semibold hover:underline underline-offset-4"
      >
        ← Back to home
      </Link>
    </section>
  );
};
