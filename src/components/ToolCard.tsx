import Link from "next/link";
import type { Tool } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { CategoryBadge } from "@/components/CategoryBadge";
import { categoryStyles } from "@/lib/categoryStyles";

export function ToolCard({ tool }: { tool: Tool }) {
  const c = categoryStyles[tool.category];
  const latest = tool.changelog[0];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group bg-surface border border-hairline rounded-xl p-4 flex flex-col gap-2.5 hover:border-coral/40 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span
          className={`w-9 h-9 rounded-md ${c.bg} ${c.fg} flex items-center justify-center`}
        >
          <Icon name={tool.icon} className="w-[18px] h-[18px]" aria-hidden="true" />
        </span>
        <CategoryBadge category={tool.category} />
      </div>

      <div className="space-y-1">
        <h3 className="text-ink text-[15px] lg:text-[16px] group-hover:text-coral transition-colors">
          {tool.name}
        </h3>
        <p className="text-ink-soft text-[13px] lg:text-[14px] line-clamp-2 leading-snug">
          {tool.tagline}
        </p>
      </div>

      {latest && (
        <p className="mt-auto text-ink-mute text-[11px] pt-1">
          v{latest.version} · {latest.date}
        </p>
      )}
    </Link>
  );
}
