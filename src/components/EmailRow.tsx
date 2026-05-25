"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

export function EmailRow({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 쓰기 실패 시 무시 (브라우저 권한 등)
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 first:rounded-t-xl hover:bg-coral-soft/40 transition-colors">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-3 flex-1 min-w-0 group"
      >
        <span className="w-9 h-9 rounded-md bg-coral-soft text-coral flex items-center justify-center shrink-0">
          <Mail className="w-[18px] h-[18px]" aria-hidden="true" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-ink text-[14px] group-hover:text-coral transition-colors">
            Email
          </p>
          <p className="text-ink-mute text-[12px] truncate">{email}</p>
        </div>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "복사됨" : "이메일 주소 복사"}
        className="shrink-0 p-2 rounded-md text-ink-mute hover:text-ink hover:bg-coral-soft/60 transition-colors cursor-pointer"
      >
        {copied ? (
          <Check
            className="w-4 h-4 text-sage-deep"
            aria-hidden="true"
          />
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
