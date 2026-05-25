export type ToolCategory = "web" | "bot" | "desktop" | "script";
export type ToolStatus = "active" | "beta" | "archived";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: string;
  featured?: boolean;

  liveUrl?: string;
  downloadUrl?: string;
  githubUrl?: string;
  issueUrl?: string;

  screenshot?: string;
  quickStart: string[];
  features: { icon: string; title: string; desc: string }[];

  blogPosts: { title: string; url: string }[];

  changelog: { version: string; date: string; note: string }[];

  requirements?: string[];

  stats?: {
    downloads: number;
    lastUpdated: string;
  };
}

export const tools: Tool[] = [
  {
    slug: "slide-memo",
    name: "Slide Memo",
    tagline:
      "화면 가장자리에서 슬라이드로 펼쳐지는 Windows 메모장. 모든 데이터는 내 컴퓨터에만 저장됩니다.",
    category: "desktop",
    status: "active",
    icon: "StickyNote",
    featured: true,
    screenshot: "/screenshots/slide-memo.png",
    downloadUrl:
      "https://github.com/yujeong0411/SlideMemo/releases/latest/download/SlideMemo-Setup.exe",
    githubUrl: "https://github.com/yujeong0411/SlideMemo",
    issueUrl: "https://github.com/yujeong0411/SlideMemo/issues",
    quickStart: [
      "SlideMemo-Setup.exe를 다운로드해서 더블클릭하세요",
      "관리자 권한 없이 자동으로 설치됩니다",
      "시작 메뉴에서 Slide Memo를 실행하세요",
      "화면 가장자리 세로 탭을 클릭하면 메모장이 펼쳐집니다",
    ],
    features: [
      {
        icon: "PanelRightOpen",
        title: "슬라이드 UI",
        desc: "필요할 때 펼치고 다시 숨김",
      },
      {
        icon: "Lock",
        title: "로컬 저장",
        desc: "모든 메모가 내 컴퓨터에만",
      },
      {
        icon: "Sparkles",
        title: "AI 기능 (선택)",
        desc: "요약·번역·맞춤법, 본인 API 키 필요",
      },
      {
        icon: "Mic",
        title: "음성 → 메모",
        desc: "Whisper로 자동 변환",
      },
    ],
    requirements: [
      "Windows 10 이상",
      "디스크 공간 약 50MB",
      "AI 기능 사용 시: Anthropic / OpenAI / Gemini API 키 (선택)",
      "음성 녹음 사용 시: 마이크 + OpenAI API 키",
    ],
    blogPosts: [],
    changelog: [
      {
        version: "1.0.0",
        date: "2026.05.25",
        note: "최초 정식 릴리스. 슬라이드 UI, 로컬 SQLite 저장, AI 5종(요약·번역·맞춤법·제목·키워드), 음성 녹음, 다중 AI 제공자(Anthropic/OpenAI/Gemini/Ollama)",
      },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
