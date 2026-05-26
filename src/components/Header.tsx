import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="border-b border-hairline bg-bg">
      <div className="max-w-5xl mx-auto px-7 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="NurseCoder 홈">
          <Image
            src="/logo-64.png"
            alt=""
            width={40}
            height={40}
            priority
            className="w-7 h-7 lg:w-10 lg:h-10 rounded-md"
          />
          <span className="hidden sm:inline text-ink text-[15px] lg:text-[20px]">
            <span className="text-coral-deep">Nurse</span>
            <span className="text-sage-deep">Coder</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-[14px] lg:text-[17px] text-ink-soft">
          <Link href="/tools" className="hover:text-ink transition-colors">
            Tools
          </Link>
          <Link href="/about" className="hover:text-ink transition-colors">
            About
          </Link>
          <a
            href={profile.tistory}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors inline-flex items-center gap-0.5"
          >
            Blog
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
