import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  ArrowUpRight,
  HeartPulse,
  Code,
  Notebook,
} from "lucide-react";
import { profile } from "@/data/profile";
import { EmailRow } from "@/components/EmailRow";

export const metadata: Metadata = {
  title: "소개 — NurseCoder",
  description: `${profile.name} · ${profile.tagline}`,
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.04c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.17a10.9 10.9 0 015.74 0c2.18-1.48 3.14-1.17 3.14-1.17.63 1.58.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.05.78 2.12v3.14c0 .31.21.68.79.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const doing = [
  {
    icon: HeartPulse,
    iconBg: "bg-coral-soft",
    iconFg: "text-coral",
    title: "의료 현장 업무",
    desc: "본업으로 현장에서 일합니다.",
  },
  {
    icon: Code,
    iconBg: "bg-sage-soft",
    iconFg: "text-sage-deep",
    title: "사이드 프로젝트 개발",
    desc: "필요한 작은 도구들을 만들어 공개합니다.",
  },
  {
    icon: Notebook,
    iconBg: "bg-lavender-soft",
    iconFg: "text-lavender-deep",
    title: "기술 블로그 운영",
    desc: "만든 과정과 배운 것을 티스토리에 기록합니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-7 py-16 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="mx-auto w-24 h-24 rounded-full bg-white border border-hairline flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt=""
            width={96}
            height={96}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-[28px] text-ink leading-tight">{profile.name}</h1>
        <p className="text-ink-soft text-[15px]">{profile.tagline}</p>
        <p className="text-[13px] tracking-wide pt-1">
          <span className="text-coral">care</span>
          <span className="text-ink-mute"> · </span>
          <span className="text-sage-deep">code</span>
          <span className="text-ink-mute"> · </span>
          <span className="text-lavender-deep">create</span>
        </p>
      </section>

      {/* 소개 */}
      <section>
        <div className="bg-surface border border-hairline rounded-xl p-6 space-y-4 text-ink-soft text-[15px] leading-[1.8]">
          <p>
            의료 현장에서 일하다가 직접 필요한 도구를 만들기 시작했어요.
            반복되는 일을 줄이고 싶어서 파이썬을 배웠고, 그게 첫 도구가 됐어요.
          </p>
          <p>
            지금은 본업을 하면서 동료들이 진짜로 쓸 수 있는 작은 도구들을
            만들고 있어요. 거창한 제품은 아니지만 누군가의 하루를 5분 줄여줄 수
            있다면 그걸로 만족해요.
          </p>
        </div>
      </section>

      {/* 하는 일 */}
      <section className="space-y-4">
        <h2 className="text-ink text-[20px]">하는 일</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {doing.map((d) => (
            <div
              key={d.title}
              className="bg-surface border border-hairline rounded-xl p-4 space-y-2"
            >
              <span
                className={`w-9 h-9 rounded-md ${d.iconBg} ${d.iconFg} flex items-center justify-center`}
              >
                <d.icon className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              <h3 className="text-ink text-[14px]">{d.title}</h3>
              <p className="text-ink-soft text-[13px] leading-snug">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 연락하기 */}
      <section className="space-y-4">
        <h2 className="text-ink text-[20px]">연락하기</h2>
        <div className="bg-surface border border-hairline rounded-xl divide-y divide-hairline">
          <EmailRow email={profile.email} />

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 group hover:bg-sage-soft/40 transition-colors"
          >
            <span className="w-9 h-9 rounded-md bg-sage-soft text-sage-deep flex items-center justify-center shrink-0">
              <GitHubIcon className="w-[18px] h-[18px]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-ink text-[14px] group-hover:text-sage-deep transition-colors">
                GitHub
              </p>
              <p className="text-ink-mute text-[12px] truncate">
                코드 저장소를 둘러보세요
              </p>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-ink-mute shrink-0"
              aria-hidden="true"
            />
          </a>

          <a
            href={profile.tistory}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 group hover:bg-lavender-soft/40 transition-colors last:rounded-b-xl"
          >
            <span className="w-9 h-9 rounded-md bg-lavender-soft text-lavender-deep flex items-center justify-center shrink-0">
              <BookOpen className="w-[18px] h-[18px]" aria-hidden="true" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-ink text-[14px] group-hover:text-lavender-deep transition-colors">
                Tistory
              </p>
              <p className="text-ink-mute text-[12px] truncate">
                만든 과정과 배운 것
              </p>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-ink-mute shrink-0"
              aria-hidden="true"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
