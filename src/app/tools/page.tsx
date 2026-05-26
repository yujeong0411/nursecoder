import type { Metadata } from "next";
import { tools } from "@/data/tools";
import { ToolList } from "@/components/ToolList";

export const metadata: Metadata = {
  title: "도구 모음 — NurseCoder",
  description: "nursecoder가 만든 도구들을 모두 모아둔 곳.",
};

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-7 py-16 space-y-9">
      <header className="space-y-2">
        <h1 className="text-[28px] lg:text-[34px] text-ink leading-[1.25]">도구 모음</h1>
        <p className="text-ink-soft text-[15px] lg:text-[17px]">
          내가 만든 것들을 모두 모아뒀어요.
        </p>
      </header>

      <ToolList tools={tools} />
    </div>
  );
}
