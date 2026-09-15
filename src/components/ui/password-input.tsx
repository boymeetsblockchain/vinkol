"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * A password field with a show/hide toggle.
 *
 * All eleven password inputs in the app were bespoke raw `<input>`s with no
 * toggle, in two shapes: seven react-hook-form `{...register(...)}` spreads and
 * four controlled `value`/`onChange` pairs. Spreading `ComponentProps<"input">`
 * serves both — React 19 passes `ref` as an ordinary prop, so RHF's ref reaches
 * the input without `forwardRef`, exactly as `ui/input.tsx` relies on.
 *
 * The toggle follows the wallet-balance mask already in the dashboards: lucide
 * `Eye`/`EyeOff`, `EyeOff` while the value is visible, and an `aria-label` that
 * flips. It is `tabIndex={-1}` so it does not sit between the field and the
 * submit button, and `type="button"` so it cannot submit the form.
 */
export function PasswordInput({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<"input"> & { wrapperClassName?: string }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={`${className ?? ""} pr-11`}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((was) => !was)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700 transition-colors"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
