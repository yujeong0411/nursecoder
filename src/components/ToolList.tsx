"use client";

import { useState } from "react";
import type { Tool, ToolCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

type Filter = "all" | ToolCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "web", label: "Web" },
  { value: "bot", label: "Bot" },
  { value: "desktop", label: "Desktop" },
  { value: "script", label: "Script" },
];

export function ToolList({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? tools : tools.filter((t) => t.category === active);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="카테고리 필터">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.value)}
              className={
                "px-3 py-1 rounded-full text-[13px] cursor-pointer transition-colors " +
                (isActive
                  ? "bg-coral text-white"
                  : "bg-surface text-ink-soft border border-hairline hover:text-ink")
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      ) : (
        <p className="text-ink-mute text-[13px] py-6">
          이 카테고리에는 아직 도구가 없어요.
        </p>
      )}
    </div>
  );
}
