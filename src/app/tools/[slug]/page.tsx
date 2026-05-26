import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  ExternalLink,
  AlertCircle,
  Notebook,
  BookOpen,
} from "lucide-react";
import { tools, getToolBySlug } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { CategoryBadge } from "@/components/CategoryBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { categoryStyles } from "@/lib/categoryStyles";

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
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
    title: `${tool.name} — NurseCoder`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const c = categoryStyles[tool.category];
  const recentChangelog = tool.changelog.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-7 py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-mute" aria-label="Breadcrumb">
        <Link href="/tools" className="hover:text-ink transition-colors">
          Tools
        </Link>
        <span className="mx-1">›</span>
        <span>{tool.name}</span>
      </nav>

      {/* Hero */}
      <section className="flex items-start gap-4">
        <span
          className={`w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl ${c.bg} ${c.fg} flex items-center justify-center`}
        >
          <Icon
            name={tool.icon}
            className="w-[22px] h-[22px] sm:w-7 sm:h-7"
            aria-hidden="true"
          />
        </span>
        <div className="space-y-2 min-w-0">
          <h1 className="text-[24px] lg:text-[30px] text-ink leading-tight">{tool.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={tool.category} />
            <StatusBadge status={tool.status} />
          </div>
          <p className="text-ink-soft text-[15px] lg:text-[17px]">{tool.tagline}</p>
        </div>
      </section>

      {/* 액션 버튼 */}
      <section className="flex flex-wrap gap-1.5 sm:gap-2">
        {tool.liveUrl && (
          <a
            href={tool.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-coral text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] text-[12px] sm:text-[14px] hover:bg-coral/90 transition-colors"
          >
            바로 사용하기
            <ArrowUpRight
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              aria-hidden="true"
            />
          </a>
        )}
        {tool.downloadUrl && (
          <a
            href={tool.downloadUrl}
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-coral text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] text-[12px] sm:text-[14px] hover:bg-coral/90 transition-colors"
          >
            <Download
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              aria-hidden="true"
            />
            다운로드
          </a>
        )}
        {tool.githubUrl && (
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-blush text-ink-soft border border-hairline px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] text-[12px] sm:text-[14px] hover:text-ink hover:border-ink-mute/30 transition-colors"
          >
            <ExternalLink
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              aria-hidden="true"
            />
            GitHub
          </a>
        )}
        {tool.issueUrl && (
          <a
            href={tool.issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-blush text-ink-soft border border-hairline px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-[10px] text-[12px] sm:text-[14px] hover:text-ink hover:border-ink-mute/30 transition-colors"
          >
            <AlertCircle
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              aria-hidden="true"
            />
            이슈 신고
          </a>
        )}
      </section>

      {/* 스크린샷 */}
      <section>
        {tool.screenshot ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-hairline">
            <Image
              src={tool.screenshot}
              alt={`${tool.name} 스크린샷`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-surface border border-hairline flex items-center justify-center">
            <p className="text-ink-mute text-[13px]">스크린샷 준비 중</p>
          </div>
        )}
      </section>

      {/* 빠른 시작 */}
      {tool.quickStart.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-ink text-[18px] lg:text-[20px]">빠른 시작</h2>
          <ol className="bg-surface border border-hairline rounded-xl p-5 space-y-3">
            {tool.quickStart.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 shrink-0 rounded-full bg-coral-soft text-coral text-[12px] flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-ink-soft text-[14px] lg:text-[16px] leading-snug pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 주요 기능 */}
      {tool.features.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-ink text-[18px] lg:text-[20px]">주요 기능</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.features.map((f, i) => (
              <div
                key={i}
                className="bg-surface border border-hairline rounded-xl p-4 space-y-2"
              >
                <span
                  className={`w-9 h-9 rounded-md ${c.bg} ${c.fg} flex items-center justify-center`}
                >
                  <Icon
                    name={f.icon}
                    className="w-[18px] h-[18px]"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-ink text-[14px] lg:text-[16px]">{f.title}</h3>
                <p className="text-ink-soft text-[13px] lg:text-[15px] leading-snug">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 자세한 사용법 CTA */}
      {tool.hasGuide && (
        <section>
          <Link
            href={`/tools/${tool.slug}/guide`}
            className="relative block rounded-xl overflow-hidden bg-gradient-to-br from-coral-soft to-lavender-soft p-6 hover:opacity-90 transition-opacity"
          >
            <span className="inline-flex items-center rounded-md bg-white border border-hairline px-1.5 py-0.5 text-[11px] text-ink-mute mb-3">
              자세히 보기
            </span>
            <p className="text-ink text-[16px] mb-1">
              {tool.name} 완전 사용 가이드
            </p>
            <p className="text-ink-soft text-[13px]">
              모든 기능, 단축키, 설정 가이드를 한 곳에 정리했어요.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 bg-ink text-white px-3 py-1.5 rounded-[10px] text-[13px]">
              가이드 읽기
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <BookOpen
              className="absolute right-5 bottom-4 w-16 h-16 text-ink opacity-[0.07]"
              aria-hidden="true"
            />
          </Link>
        </section>
      )}

      {/* 관련 글 */}
      {tool.blogPosts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-ink text-[18px] lg:text-[20px]">관련 글</h2>
          <div className="bg-surface border border-hairline rounded-xl divide-y divide-hairline">
            {tool.blogPosts.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 group hover:bg-coral-soft/40 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <Notebook
                  className="w-4 h-4 text-ink-mute shrink-0"
                  aria-hidden="true"
                />
                <span className="text-ink-soft text-[14px] flex-1 group-hover:text-ink transition-colors">
                  {post.title}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-ink-mute shrink-0"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 변경 이력 */}
      {recentChangelog.length > 0 && (
        <section id="changelog" className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-ink text-[18px] lg:text-[20px]">변경 이력</h2>
            {tool.changelog.length > 3 && (
              <Link
                href="#changelog"
                className="text-[13px] text-ink-mute hover:text-ink transition-colors inline-flex items-center gap-0.5"
              >
                전체 보기
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
          <ul className="bg-surface border border-hairline rounded-xl divide-y divide-hairline">
            {recentChangelog.map((entry, i) => (
              <li key={entry.version} className="px-4 py-3 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-md bg-coral-soft text-coral px-1.5 py-0.5 text-[11px]">
                    v{entry.version}
                  </span>
                  {i === 0 && (
                    <span className="inline-flex items-center rounded-md bg-sage-soft text-sage-deep px-1.5 py-0.5 text-[11px]">
                      latest
                    </span>
                  )}
                  <span className="text-ink-mute text-[12px]">
                    {entry.date}
                  </span>
                </div>
                <p className="text-ink-soft text-[14px] lg:text-[16px] leading-snug">
                  {entry.note}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 시스템 요구사항 (데스크톱 도구일 때만) */}
      {tool.category === "desktop" &&
        tool.requirements &&
        tool.requirements.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-ink text-[18px] lg:text-[20px]">시스템 요구사항</h2>
            <ul className="bg-surface border border-hairline rounded-xl p-5 space-y-2">
              {tool.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-ink-soft text-[14px] lg:text-[16px]"
                >
                  <span className="text-ink-mute mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
    </div>
  );
}
