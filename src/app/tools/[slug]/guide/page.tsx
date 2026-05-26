import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { tools, getToolBySlug } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { categoryStyles } from "@/lib/categoryStyles";
import { getGuide } from "@/lib/mdx";

export async function generateStaticParams() {
  return tools.filter((t) => t.hasGuide).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "도구를 찾을 수 없어요 — NurseCoder" };
  return {
    title: `${tool.name} 사용 가이드 — NurseCoder`,
    description: `${tool.name}의 모든 기능을 자세히 알아봅니다.`,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || !tool.hasGuide) notFound();

  const guide = await getGuide(slug);
  if (!guide) notFound();

  const { content, headings } = guide;
  const c = categoryStyles[tool.category];

  return (
    <div className="max-w-5xl mx-auto px-7 py-12">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-mute mb-8" aria-label="Breadcrumb">
        <Link href="/tools" className="hover:text-ink transition-colors">
          Tools
        </Link>
        <span className="mx-1">›</span>
        <Link
          href={`/tools/${tool.slug}`}
          className="hover:text-ink transition-colors"
        >
          {tool.name}
        </Link>
        <span className="mx-1">›</span>
        <span>사용 가이드</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div className="flex items-start gap-4">
          <span
            className={`w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl ${c.bg} ${c.fg} flex items-center justify-center`}
          >
            <Icon
              name={tool.icon}
              className="w-[22px] h-[22px] sm:w-7 sm:h-7"
              aria-hidden="true"
            />
          </span>
          <div className="space-y-1">
            <h1 className="text-[24px] text-ink leading-tight">
              {tool.name} 사용 가이드
            </h1>
            <p className="text-ink-soft text-[14px]">
              {tool.name}의 모든 기능을 자세히 알아봅니다.
            </p>
          </div>
        </div>
        <Link
          href={`/tools/${tool.slug}`}
          className="shrink-0 text-[13px] text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          도구 페이지로
        </Link>
      </div>

      {/* Grid: TOC sidebar + content */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 lg:items-start">
        {/* TOC */}
        {headings.length > 0 && (
          <aside>
            {/* Mobile: 접이식 */}
            <details className="lg:hidden bg-surface border border-hairline rounded-xl mb-8 open:pb-2">
              <summary className="px-4 py-3 text-[13px] text-ink cursor-pointer select-none list-none flex items-center justify-between">
                목차
                <span className="text-ink-mute text-[11px]">펼치기</span>
              </summary>
              <nav className="px-4 pb-2 space-y-1">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-[13px] text-ink-soft hover:text-ink transition-colors py-1"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </details>
            {/* Desktop: 사이드바 */}
            <nav className="hidden lg:block sticky top-24 bg-surface border border-hairline rounded-xl p-4">
              <p className="text-[11px] text-ink-mute mb-3 uppercase tracking-wide">
                목차
              </p>
              <div className="space-y-0.5">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-[13px] text-ink-soft hover:text-ink transition-colors py-1.5 border-l-2 border-transparent hover:border-coral pl-3"
                  >
                    {h.text}
                  </a>
                ))}
              </div>
            </nav>
          </aside>
        )}

        {/* 본문 */}
        <div>
          <div className="mdx-body">{content}</div>

          {/* 하단 네비 */}
          <div className="mt-12 pt-8 border-t border-hairline flex items-center justify-between gap-4 flex-wrap">
            <Link
              href={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-1.5 bg-blush text-ink-soft border border-hairline px-4 py-2 rounded-[10px] text-[14px] hover:text-ink hover:border-ink-mute/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              도구 페이지로 돌아가기
            </Link>
          </div>

          {/* GitHub 이슈 안내 */}
          {tool.issueUrl && (
            <p className="mt-6 text-[12px] text-ink-mute">
              궁금한 점이 있다면{" "}
              <a
                href={tool.issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                GitHub 이슈로 알려주세요
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
