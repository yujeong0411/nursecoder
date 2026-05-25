import type { ToolStatus } from "@/data/tools";
import { statusStyles } from "@/lib/categoryStyles";

export function StatusBadge({
  status,
  className = "",
}: {
  status: ToolStatus;
  className?: string;
}) {
  const s = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] ${s.bg} ${s.fg} ${className}`}
    >
      {s.label}
    </span>
  );
}
