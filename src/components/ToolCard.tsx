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
      className="group bg-surface border border-hairline rounded-xl p-4 flex flex-col gap-2.5 hover:border-coral/40 hover:-translate-y-1 hover:shadow-md hover:shadow-coral/10 transition-all duration-200"
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`w-9 h-9 shrink-0 rounded-md ${c.bg} ${c.fg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon name={tool.icon} className="w-[18px] h-[18px]" aria-hidden="true" />
        </span>
        <h3 className="text-ink text-[15px] lg:text-[18px] group-hover:text-coral transition-colors flex-1 min-w-0 truncate">
          {tool.name}
        </h3>
        <CategoryBadge category={tool.category} />
      </div>

      <p className="text-ink-soft text-[13px] lg:text-[16px] line-clamp-2 leading-snug">
        {tool.tagline}
      </p>

      {latest && (
        <p className="mt-auto text-ink-mute text-[11px] pt-1">
          v{latest.version} · {latest.date}
        </p>
      )}
    </Link>
  );
}
