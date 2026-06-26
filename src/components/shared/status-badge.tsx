import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "accepted" | "picked" | "delivered" | "cancelled" | "confirmed";

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  accepted: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  picked: {
    label: "In Transit",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalised = status?.toLowerCase() as OrderStatus;
  const config = statusConfig[normalised] ?? {
    label: status ?? "Unknown",
    className: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
