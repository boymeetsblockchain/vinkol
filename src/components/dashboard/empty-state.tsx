import { LucideIcon } from "lucide-react";

/**
 * The "nothing here" state, in the shape the withdrawal history already used.
 * The order lists used a bare line of centred grey text, which read as though
 * the page had failed rather than as an answer.
 */
export const EmptyState = ({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
      <Icon size={24} className="text-[var(--color-blue-primary)]" />
    </div>
    <p className="font-semibold text-gray-800">{title}</p>
    {body && <p className="text-gray-400 text-sm mt-1 max-w-sm">{body}</p>}
  </div>
);
