import { BookOpen } from "lucide-react";
import { profile } from "@/data/profile";

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

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-bg mt-16">
      <div className="max-w-5xl mx-auto px-7 py-5 flex items-center justify-between text-[13px] text-ink-mute">
        <p>
          made with <span className="text-coral">♥</span> by nursecoder
        </p>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-ink transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.tistory}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tistory 블로그"
            className="hover:text-ink transition-colors"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
