"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A two-state toggle.
 *
 * Hand-rolled rather than pulled in: there is no switch, toggle or checkbox in
 * `ui/`, and `@radix-ui/react-switch` is not a dependency. The avatar menu and
 * the onboarding progress bar were built the same way, for the same reason.
 *
 * A `<button role="switch">` rather than a styled checkbox, because that is what
 * the pattern actually is — it takes Space and Enter for free, reports its state
 * through `aria-checked`, and needs no hidden input to stay in sync.
 */
export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick" | "type" | "value"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:outline-none",
        checked ? "bg-blue-600" : "bg-gray-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
