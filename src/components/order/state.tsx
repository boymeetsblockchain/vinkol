import React from "react";

/**
 * One full-screen outcome: an icon, a headline, an explanation and what to do
 * next.
 *
 * Shared by the payment success and cancellation pages so the two cannot drift
 * apart — a customer who abandons a payment and one who completes it should
 * land on pages that look like the same product.
 */
export interface OrderStateProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
}

export const OrderState = ({
  icon,
  title,
  description,
  actions,
}: OrderStateProps) => (
  <div className="space-y-4">
    <div className="flex justify-center">{icon}</div>
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    {actions && <div className="pt-4">{actions}</div>}
  </div>
);

/** The centred frame both pages sit in. */
export const OrderStateShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <section className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-md w-full text-center space-y-6">{children}</div>
  </section>
);
