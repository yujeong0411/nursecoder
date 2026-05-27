import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { tools, getToolBySlug } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { categoryStyles } from "@/lib/categoryStyles";
import { getGuide } from "@/lib/mdx";
import { GuideToc } from "@/components/GuideToc";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-7 py-12">
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
          {tool.logo ? (
            <Image
              src={tool.logo}
              alt=""
              width={56}
              height={56}
              className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl object-contain"
            />
          ) : (
            <span
              className={`w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl ${c.bg} ${c.fg} flex items-center justify-center`}
            >
              <Icon
                name={tool.icon}
                className="w-[22px] h-[22px] sm:w-7 sm:h-7"
                aria-hidden="true"
              />
            </span>
          )}
          <div className="space-y-1">
            <h1 className="text-[22px] lg:text-[30px] text-ink leading-tight">
              {tool.name} 사용 가이드
            </h1>
            <p className="text-ink-soft text-[14px] lg:text-[16px]">
              {tool.name}의 모든 기능을 자세히 알아봅니다.
            </p>
          </div>
        </div>
        <Link
          href={`/tools/${tool.slug}`}
          className="hidden sm:inline-flex shrink-0 text-[13px] text-ink-soft hover:text-ink transition-colors items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          도구 페이지로
        </Link>
      </div>

      {/* Grid: TOC sidebar + content */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* TOC */}
        {headings.length > 0 && (
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GuideToc headings={headings} />
          </aside>
        )}

        {/* 본문 */}
        <div>
          <div className="mdx-body">{content}</div>

          {/* 하단 네비 */}
          <div className="mt-12 pt-8 border-t border-hairline flex items-center justify-between gap-4 flex-wrap">
            <Link
              href={`/tools/${tool.slug}`}
              className="inline-flex items-center gap-1.5 bg-blush text-ink-soft border border-hairline px-3 py-1.5 sm:px-4 sm:py-2 rounded-[10px] text-[13px] sm:text-[14px] hover:text-ink hover:border-ink-mute/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              도구 페이지로 돌아가기
            </Link>
          </div>

          {/* 문의 안내 */}
          <p className="mt-6 text-[12px] text-ink-mute">
            궁금한 점이 있다면{" "}
            <a
              href="mailto:choiyujeong0411@gmail.com"
              className="hover:text-ink transition-colors underline underline-offset-2 inline-flex items-center gap-0.5"
            >
              이메일로 알려주세요
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
