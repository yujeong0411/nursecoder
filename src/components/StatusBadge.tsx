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
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[12px] lg:text-[13px] font-medium tracking-wide ${s.bg} ${s.fg} ${className}`}
    >
      {s.label}
    </span>
  );
}
