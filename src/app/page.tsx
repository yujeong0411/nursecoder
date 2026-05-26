import Link from "next/link";
import { ArrowRight, Heart, Plus } from "lucide-react";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

const WAVE_LINES = ["현장에서 만든", "일상의 작은 도구들"] as const;

function WaveText() {
  let charIndex = 0;
  return (
    <>
      {WAVE_LINES.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split("").map((char) => {
            const delay = (charIndex++ * 0.06).toFixed(2);
            return (
              <span
                key={delay}
                className="inline-block"
                style={{
                  animation: `wave-char 1.2s ease-in-out 1`,
                  animationDelay: `${delay}s`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const featured = tools.filter((t) => t.featured).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-7 py-16 space-y-14">
      {/* Hero */}
      <section className="relative">
        <div className="relative z-10 space-y-5">
          <p className="text-[13px] lg:text-[16px] tracking-wide">
            <span className="text-coral">care</span>
            <span className="text-ink-mute"> · </span>
            <span className="text-sage-deep">code</span>
            <span className="text-ink-mute"> · </span>
            <span className="text-lavender-deep">create</span>
          </p>

          <h1
            className="text-[34px] lg:text-[54px] text-ink leading-[1.35]"
            aria-label="현장에서 만든 일상의 작은 도구들"
          >
            <WaveText />
          </h1>

          <p className="text-ink-soft text-[15px] lg:text-[18px]">
            필요해서 만들기 시작했어요.
            <br />
            누구나 다운로드해서 바로 쓸 수 있습니다.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 bg-coral text-white px-4 py-2 rounded-[10px] text-[14px] lg:text-[16px] hover:bg-coral/90 transition-colors"
            >
              도구 둘러보기
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center bg-blush text-ink-soft border border-hairline px-4 py-2 rounded-[10px] text-[14px] lg:text-[16px] hover:text-ink hover:border-ink-mute/30 transition-colors"
            >
              소개
            </Link>
          </div>
        </div>

        {/* 장식 요소 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden sm:block"
        >
          <span className="absolute right-2 top-1 w-10 h-10 rounded-full bg-lavender-soft opacity-70" />
          <Plus className="absolute right-24 top-12 w-5 h-5 text-sage opacity-70" />
          <Heart
            className="absolute right-8 bottom-4 w-6 h-6 text-coral opacity-60"
            fill="currentColor"
          />
        </div>
      </section>

      {/* 대표 도구 */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-ink text-[20px] lg:text-[22px]">대표 도구</h2>
          <Link
            href="/tools"
            className="text-[13px] text-ink-mute hover:text-ink transition-colors inline-flex items-center gap-0.5"
          >
            전체 보기
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        ) : (
          <p className="text-ink-mute text-[13px]">
            아직 대표 도구가 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}
