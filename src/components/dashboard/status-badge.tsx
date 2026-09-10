import { CheckCircle2, Clock } from "lucide-react";

/** The settled/outstanding pill, previously written out twice. */
export const StatusBadge = ({
  ok,
  okLabel,
  pendingLabel,
}: {
  ok?: boolean;
  okLabel: string;
  pendingLabel: string;
}) => (
  <span
    className={
      ok
        ? "flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1"
        : "flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1"
    }
  >
    {ok ? <CheckCircle2 size={12} /> : <Clock size={12} />}
    {ok ? okLabel : pendingLabel}
  </span>
);
