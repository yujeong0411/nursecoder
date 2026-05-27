"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/mdx";

export function GuideToc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  return (
    <>
      {/* Mobile: 접이식 */}
      <details className="lg:hidden bg-surface border border-hairline rounded-xl mb-8 open:pb-2">
        <summary className="px-4 py-3 text-[14px] text-ink cursor-pointer select-none list-none flex items-center justify-between">
          <span className="text-[16px] font-semibold">목차</span>
          <span className="text-ink-mute text-[12px]">펼치기</span>
        </summary>
        <nav className="px-4 pb-2 space-y-1">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-[14px] transition-colors py-1 ${
                activeId === h.id
                  ? "text-coral"
                  : "text-ink hover:text-coral"
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </details>

      {/* Desktop: 사이드바 */}
      <nav className="hidden lg:block bg-surface border border-hairline rounded-xl p-4">
        <p className="text-[17px] text-ink-soft font-semibold mb-3 uppercase tracking-wide">
          목차
        </p>
        <div className="space-y-0.5">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-[15px] transition-colors py-1.5 border-l-2 pl-3 ${
                activeId === h.id
                  ? "text-coral border-coral"
                  : "text-ink hover:text-coral border-transparent hover:border-coral"
              }`}
            >
              {h.text}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
