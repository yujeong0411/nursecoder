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
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[12px] lg:text-[13px] font-medium tracking-wide ${s.bg} ${s.fg} ${className}`}
    >
      {s.label}
    </span>
  );
}
