import type { ToolCategory } from "@/data/tools";
import { categoryStyles } from "@/lib/categoryStyles";

export function CategoryBadge({
  category,
  className = "",
}: {
  category: ToolCategory;
  className?: string;
}) {
  const s = categoryStyles[category];
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] ${s.bg} ${s.fg} ${className}`}
    >
      {s.label}
    </span>
  );
}
