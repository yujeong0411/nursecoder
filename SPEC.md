# NurseCoder — 사이트 구축 사양서

> Claude Code 작업 지시서. 이 문서를 처음부터 끝까지 읽고 구현하세요.

---

## 1. 프로젝트 개요

### 무엇을 만드나
**NurseCoder** — 의료 현장에서 일하는 개발자(nursecoder)가 만든 도구들을 공개하고 다운로드받게 하는 사이트.

### 핵심 사용자 시나리오
- "이 사람이 만든 거 뭐 있어?" → **홈** 또는 **도구 목록**
- "이 도구 어떻게 써?" → **도구 상세 페이지의 빠른 시작**
- "이 도구 어떻게 만들었나 궁금" → **도구 상세 → 관련 글 → 티스토리**
- "업데이트됐나?" → **도구 상세 → 변경 이력**
- "만든 사람 누구?" → **About**
- "이 도구의 모든 기능을 자세히 알고 싶다" → **도구 상세 → 자세한 사용법 → 가이드 페이지**

### 비목표 (만들지 않을 것)
- 블로그 기능 (티스토리에서 처리)
- 댓글, 회원가입, 결제, 좋아요
- 다국어 (한국어만)
- 동적 백엔드 / 데이터베이스

---

## 2. 기술 스택

```
Framework:  Next.js 15 (App Router)
Language:   TypeScript
Styling:    Tailwind CSS v4 (globals.css @theme 방식 — tailwind.config.ts 없음)
Icons:      lucide-react
Fonts:      Pretendard (CDN), 시스템 폰트 fallback
배포:        Vercel
콘텐츠:      TypeScript 객체 (data/tools.ts) + MDX (content/guides/)
```

설치 명령:
```bash
npx create-next-app@latest nursecoder \
  --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
cd nursecoder
npm install lucide-react
```

MDX 관련 패키지 (가이드 페이지 구축 단계에서):
```bash
npm install next-mdx-remote gray-matter remark-gfm rehype-slug rehype-autolink-headings
```

---

## 3. 디자인 시스템

### 색상 (globals.css @theme에 등록)

Tailwind v4는 `tailwind.config.ts` 대신 `src/app/globals.css`의 `@theme` 블록에서 색상을 선언합니다.

```css
/* src/app/globals.css */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");
@import "tailwindcss";

@theme {
  /* 베이스 */
  --color-bg: #ffffff;
  --color-surface: #fafbf9;

  /* 브랜드 */
  --color-coral: #e89b9b;
  --color-sage: #a8d4b9;
  --color-lavender: #c9b8e0;

  /* 카테고리 배경 (옅은 톤) */
  --color-coral-soft: #fceded;
  --color-sage-soft: #eaf4ee;
  --color-lavender-soft: #f2edf7;
  --color-blush: #fef6f0;        /* 보조 버튼·중립 배경 */

  /* 카테고리 텍스트 (진한 톤) */
  --color-coral-deep: #d58787;
  --color-sage-deep: #6fb089;
  --color-lavender-deep: #9b83bd;

  /* 텍스트 */
  --color-ink: #6b4f56;
  --color-ink-soft: #735660;
  --color-ink-mute: #8e7680;

  /* 테두리 */
  --color-hairline: rgba(139, 107, 115, 0.12);

  /* 폰트 */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
}
```

### 타이포그래피
- 본문 폰트: **Pretendard** (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`)
- 영문/숫자: 시스템 폰트 fallback
- 헤딩 weight: 500 (강하지 않게)
- 본문 line-height: 1.7
- **bold는 weight 500만, 600/700 금지** (페이지 톤이 무거워짐)

### 모서리
- 카드: `rounded-xl` (12px)
- 페이지 컨테이너: `rounded-2xl` (16px)
- 버튼: `rounded-[10px]`
- 배지: `rounded-md` (6px) 또는 `rounded-full` (pill)

### 컴포넌트 규칙
- 카드는 `bg-surface border border-hairline rounded-xl p-4`
- 페이지 max-width는 `max-w-5xl` (~1024px), 가운데 정렬
- 페이지 좌우 패딩: `px-7` (28px)
- 섹션 간 수직 간격: `space-y-9` (~36px)
- 보조 버튼 배경: `bg-blush` (흰색에 가까운 따뜻한 중립)

### 카테고리별 색 매핑 (도구 카드 아이콘에서 사용)

| 카테고리 | 아이콘 배경 | 아이콘 색 | 의미 |
|---|---|---|---|
| Web | coral-soft | coral | 일상 / 웹앱 |
| Bot | sage-soft | sage-deep | 자동화 / 데이터 |
| Desktop | lavender-soft | lavender-deep | 전문가 / 데스크톱 |
| Script | sage-soft | sage-deep | CLI / 스크립트 |

상태 배지 색:

| 상태 | 배경 | 텍스트 |
|---|---|---|
| Active | sage-soft | sage-deep |
| Beta | lavender-soft | lavender-deep |
| Archived | hairline | ink-mute |

---

## 4. 페이지 구조

```
src/app/
├── layout.tsx          # 공통 레이아웃 (헤더 + 푸터)
├── page.tsx            # 홈 /
├── tools/
│   ├── page.tsx        # 도구 목록 /tools
│   └── [slug]/
│       ├── page.tsx    # 도구 상세 /tools/[slug]
│       └── guide/
│           └── page.tsx # 자세한 사용 가이드 /tools/[slug]/guide
└── about/
    └── page.tsx        # About /about

src/content/
└── guides/             # MDX 가이드 콘텐츠
    └── [slug].mdx      # 도구별 가이드 (예: slide-memo.mdx)
```

### 4.1 공통 레이아웃

**헤더** (`src/components/Header.tsx`)
- 좌측 로고: `logo-64.png` 이미지 28x28 (`rounded-md`), 옆에 "NurseCoder" 텍스트 (Nurse=coral-deep, Coder=sage-deep), sm 미만에서는 텍스트 숨김
- 우측 네비: `Tools`, `About`, `Blog ↗` (블로그는 외부 링크, `target="_blank"`)
- 배경 흰색, 하단에 hairline 보더, padding `py-4 px-7`

**푸터** (`src/components/Footer.tsx`)
- 좌측: `made with ♥ by nursecoder` (♥는 coral)
- 우측: GitHub / Tistory 아이콘 링크
- 상단에 hairline 보더, padding `py-5 px-7`

### 4.2 홈 (`/`)

섹션 구성:
1. **Hero**
   - 배지: `care · code · create` (각 단어 색: coral / sage-deep / lavender-deep)
   - 헤드라인: `현장에서 만든\n일상의 작은 도구들` (34px, ink 색, line-height 1.25)
   - 서브카피: `필요해서 만들기 시작했어요.\n누구나 다운로드해서 바로 쓸 수 있습니다.`
   - 버튼 2개: `도구 둘러보기` (coral 배경/흰 글씨) / `소개` (blush 배경/ink-soft 글씨/border)
   - 우측에 장식 요소: 작은 라벤더 원, sage `+`, coral 하트 (절대위치, 옅은 opacity, sm 이상에서만 표시)

2. **대표 도구** (헤더 + "전체 보기 →")
   - 카드 그리드: `grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3`
   - 카드는 `tools.featured === true`인 것만, 최대 3개
   - 각 카드: 아이콘(카테고리 색), 카테고리 배지, 이름, 한 줄 설명, 버전+날짜

### 4.3 도구 목록 (`/tools`)

1. **페이지 타이틀**: `도구 모음` + 한 줄 부제 `내가 만든 것들을 모두 모아뒀어요.`
2. **필터바**: 카테고리 칩 (`전체` / `Web` / `Bot` / `Desktop` / `Script`)
   - 클라이언트 컴포넌트로 처리, useState로 활성 카테고리 관리
   - 칩 활성: coral 배경 + 흰 글씨, 비활성: surface 배경 + ink-soft
3. **카드 그리드**: 홈과 동일한 카드 디자인, 전체 도구 표시

### 4.4 도구 상세 (`/tools/[slug]`)

**`generateStaticParams`로 모든 slug 정적 생성.** 데이터 못 찾으면 `notFound()`.
**`params`는 `Promise<{ slug: string }>`로 받고 `await` 처리** (Next.js 15 방식).

섹션 순서:
1. **Breadcrumb**: `Tools › {tool.name}` (ink-mute 색, 12px)
2. **Hero 블록**:
   - 좌측 44x44(모바일) / 56x56(sm+) 아이콘 (카테고리 색)
   - 우측: 이름 (24px) + 카테고리·상태 배지 + 한 줄 설명
3. **액션 버튼들**: 도구 타입에 따라 분기
   - `liveUrl`이 있으면: `바로 사용하기` (coral 채움)
   - `downloadUrl`이 있으면: `다운로드` (coral 채움)
   - `githubUrl`이 있으면: `GitHub` (blush 배경/border)
   - `issueUrl`이 있으면: `이슈 신고` (blush 배경/border)
4. **스크린샷**: `tool.screenshot` 경로의 이미지. 없으면 "스크린샷 준비 중" placeholder 박스. 비율 16:9, 둥근 모서리. `object-contain`으로 표시.
5. **빠른 시작**: 번호 원형 배지(coral-soft/coral) + 한 줄 문장. 카드로 감쌈. `quickStart.length > 0`일 때만 표시.
6. **주요 기능**: 2열 그리드(`sm:grid-cols-2`). 각 카드 = 카테고리 색 아이콘 + 제목 + 한 줄. `features.length > 0`일 때만 표시.
7. **자세한 사용법 CTA 카드** (`tool.hasGuide === true`일 때만 표시):
   - coral-soft → lavender-soft 대각선 그라데이션 배경의 큰 카드
   - 우측 하단에 `Book2` 또는 `BookOpen` 아이콘 (lucide, opacity 0.5)
   - 상단 배지: `자세히 보기` (흰 배경, hairline border, 11px)
   - 타이틀: `{tool.name} 완전 사용 가이드` (16px, weight 500, ink)
   - 한 줄 설명: `모든 기능, 단축키, 설정 가이드를 한 곳에 정리했어요.`
   - 어두운 버튼 (ink 배경, 흰 글씨): `가이드 읽기 ↗`, `/tools/[slug]/guide`로 이동
   - `hasGuide`가 false거나 없으면 이 섹션 자체를 렌더링하지 않음
8. **관련 글**: `tool.blogPosts` 배열. 각 항목 = Notebook 아이콘 + 제목 + 외부링크 화살표. `blogPosts.length > 0`일 때만 표시.
9. **변경 이력**: 최신 3개. 3개 초과 시 "전체 보기 →" 링크 표시. 각 항목 = 버전 배지(coral-soft) + `latest` 배지(sage-soft, 첫 항목만) + 날짜 + 한 줄 변경사항.
10. **시스템 요구사항**: `category === "desktop"` && `requirements.length > 0`일 때만 표시.

### 4.5 도구 사용 가이드 (`/tools/[slug]/guide`)

도구의 모든 기능, 단축키, 설정 방법을 자세히 설명하는 페이지. 사용자가 도구를 받고 나서 "어떻게 다 쓰는 거지?" 질문을 해결하는 자리.

**라우팅 동작:**
- `generateStaticParams`로 `hasGuide: true`인 도구만 가이드 페이지 생성
- 해당 도구의 MDX 파일(`src/content/guides/[slug].mdx`)이 없으면 `notFound()`
- `hasGuide: false`이거나 누락이면 빌드 시 페이지 자체가 안 만들어짐
- `params`는 `Promise<{ slug: string }>`로 받고 `await` 처리 (Next.js 15 방식)

**페이지 구조:**

1. **Breadcrumb**: `Tools › {tool.name} › 사용 가이드` (ink-mute, 12px)
2. **헤더 블록**:
   - 아이콘 (도구 카테고리 색, 44/56px) + 도구 이름 (24px)
   - 한 줄 설명 `{tool.name}의 모든 기능을 자세히 알아봅니다.`
   - 우측 상단에 작은 텍스트 버튼: `← 도구 페이지로` (ink-soft 색, 13px)
3. **목차 (Table of Contents)**:
   - MDX의 `##` 레벨 헤딩을 자동으로 모아서 표시
   - 데스크톱(lg+): 좌측 고정 사이드바 (`sticky top-24`)
   - 모바일·태블릿: 본문 상단에 접이식 카드 (`<details>` 사용)
   - 각 항목 클릭하면 부드럽게 스크롤 (`scroll-behavior: smooth`)
   - 활성 섹션 강조 (스크롤 위치에 따라 — 옵션, 어려우면 생략)
4. **본문 (MDX 콘텐츠)**:
   - 본문 max-width는 `max-w-3xl` 유지
   - 마크다운 표준 요소 모두 지원 (헤딩·리스트·표·인용·코드·링크)
   - 추가 React 컴포넌트:
     - `<Shortcut>Ctrl+S</Shortcut>` — 단축키 표시 박스
     - `<Callout type="tip|warning|info">내용</Callout>` — 강조 박스
     - `<Steps>` / `<Step title="...">내용</Step>` — 번호 매긴 단계
5. **하단 네비게이션**:
   - 좌측: `← 도구 페이지로 돌아가기` (blush 배경 버튼)
   - 우측: 다른 도구의 가이드가 있으면 `다음 도구: XXX →` (옵션)
6. **푸터 안내**:
   - `궁금한 점이 있다면 GitHub 이슈로 알려주세요 →` ink-mute, 12px
   - `issueUrl`로 링크

**MDX 콘텐츠 작성 컨벤션:**

```markdown
# Slide Memo 사용 가이드  ← 페이지 H1, 자동 표시되므로 MDX 안에서는 생략

## 설치하기  ← TOC에 자동 포함

빠른 시작에서는 다루지 않은 자세한 설치 과정...

## 기본 사용법

### 펼치기와 접기  ← H3는 본문 내 소제목

화면 가장자리의 세로 탭을 클릭하거나 <Shortcut>Esc</Shortcut> 키로 접을 수 있어요.

<Callout type="tip">
시스템 트레이 아이콘을 더블클릭해도 펼쳐져요.
</Callout>

## 단축키 모음

| 단축키 | 동작 |
|---|---|
| <Shortcut>Ctrl+N</Shortcut> | 새 메모 |
| <Shortcut>Ctrl+F</Shortcut> | 검색창 포커스 |

## AI 기능 사용하기

<Steps>
  <Step title="API 키 발급">
    [Anthropic Console](https://console.anthropic.com) 에서 API 키를 발급받습니다.
  </Step>
  <Step title="설정 다이얼로그 열기">
    트레이 아이콘 우클릭 → 설정 → AI 탭
  </Step>
  <Step title="키 등록 및 테스트">
    제공자 선택 → API 키 입력 → 테스트 → AI 기능 사용 체크
  </Step>
</Steps>
```

**MDX 처리 (`src/lib/mdx.tsx`):**
- `next-mdx-remote/rsc`로 서버 컴포넌트에서 직접 렌더
- 또는 `next-mdx-remote` + `compileMDX` 조합
- `remark-gfm` (표·체크박스·취소선 등 GFM 지원)
- `rehype-slug` + `rehype-autolink-headings` (헤딩에 앵커 자동 생성)
- 코드 블록 신택스 하이라이팅: 일단 생략 (필요 시 `rehype-pretty-code` 추가)

**커스텀 MDX 컴포넌트 위치:**
```
src/components/mdx/
├── Shortcut.tsx     # 단축키 박스
├── Callout.tsx      # 강조 박스 (tip/warning/info)
├── Steps.tsx        # 번호 단계 컨테이너
├── Step.tsx         # 개별 단계
└── index.tsx        # MDX components 매핑 export
```

**컴포넌트 스타일 가이드:**

`<Shortcut>` — 인라인 키 박스
- `bg-surface border border-hairline rounded-md px-1.5 py-0.5 text-[12px] font-mono text-ink`

`<Callout type="tip">` (sage 톤)
- `bg-sage-soft border-l-2 border-sage rounded-r-lg p-4 my-4`
- 좌측에 `Lightbulb` 아이콘 (sage-deep)

`<Callout type="warning">` (coral 톤)
- `bg-coral-soft border-l-2 border-coral rounded-r-lg p-4 my-4`
- 좌측에 `AlertTriangle` 아이콘 (coral-deep)

`<Callout type="info">` (lavender 톤)
- `bg-lavender-soft border-l-2 border-lavender rounded-r-lg p-4 my-4`
- 좌측에 `Info` 아이콘 (lavender-deep)

`<Steps>` / `<Step>`
- 빠른 시작 섹션과 동일한 디자인 (번호 원형 배지 + 카드)
- Step 컴포넌트는 자동 번호 매기기 (Steps 안에서 index 사용)

**MDX 본문 기본 스타일** (`prose` 클래스 또는 직접 정의):
- 본문 텍스트: 14px, line-height 1.8, color ink-soft
- H2: 22px weight 500, 위 여백 40px, ink 색
- H3: 17px weight 500, 위 여백 24px, ink 색
- 인라인 코드: `bg-surface px-1.5 py-0.5 rounded text-coral-deep text-[13px] font-mono`
- 코드 블록: `bg-surface border border-hairline rounded-lg p-4 text-[13px] font-mono overflow-x-auto`
- 표: 상단·하단 보더만, 행 사이 hairline, 헤더 ink 색 weight 500
- 인용구(`>`): 좌측 coral 보더 2px + blush 배경 + 패딩 + 이탤릭 X
- 링크: coral-deep 색 + 밑줄 (hover 시 진해짐)
- 리스트 항목 간 여백: `my-2`

### 4.6 About (`/about`)

**중요: 익명성 유지를 위한 가이드라인**
- 실명, 소속 병원·기관·부서 이름, 컨소시엄 이름은 **절대 표기 금지**
- 직무는 추상적 표현만 사용 ("의료 현장", "임상 환경" 등)
- 표시명은 `nursecoder` 닉네임만 사용
- 본인 사진 사용 금지, 로고 이미지로 대체

1. **Hero (가운데 정렬)**:
   - 96x96 원형 박스에 `/logo.png` 로고 이미지 (`object-contain`)
   - 표시명 `nursecoder` (28px)
   - 한 줄 `현장에서 코드를 짭니다`
   - `care · code · create` (coral / sage-deep / lavender-deep)

2. **소개**: 2단락의 본문 글. surface 카드 안에 (`p-6`). 본문은 아래 카피 사용:
   > 의료 현장에서 일하다가 직접 필요한 도구를 만들기 시작했어요. 반복되는 일을 줄이고 싶어서 파이썬을 배웠고, 그게 첫 도구가 됐어요.
   >
   > 지금은 본업을 하면서 동료들이 진짜로 쓸 수 있는 작은 도구들을 만들고 있어요. 거창한 제품은 아니지만 누군가의 하루를 5분 줄여줄 수 있다면 그걸로 만족해요.

3. **하는 일**: 3개 카드 (구체적 소속·직책 없이 추상적으로), 1열(기본) → 3열(sm+)
   - "의료 현장 업무" (HeartPulse 아이콘, coral)
   - "사이드 프로젝트 개발" (Code 아이콘, sage)
   - "기술 블로그 운영" (Notebook 아이콘, lavender)

4. **연락하기**: Email / GitHub / Tistory 3개 행. surface 카드 안에 `divide-y divide-hairline`.
   - 각 행 = 아이콘 + 라벨 + 부가설명 + 우측 ArrowUpRight 화살표
   - Email은 클릭 시 복사(clipboard) 기능 (`EmailRow` 클라이언트 컴포넌트)
   - GitHub: sage 계열 색, Tistory: lavender 계열 색

---

## 5. 데이터 모델

### `src/data/tools.ts`

```typescript
export type ToolCategory = 'web' | 'bot' | 'desktop' | 'script';
export type ToolStatus = 'active' | 'beta' | 'archived';

export interface Tool {
  slug: string;                  // URL용 (예: "slide-memo")
  name: string;
  tagline: string;               // 한 줄 설명
  category: ToolCategory;
  status: ToolStatus;
  icon: string;                  // lucide-react 아이콘 이름 (문자열)
  featured?: boolean;            // 홈에 노출

  // 액션
  liveUrl?: string;              // 웹앱이면 채움
  downloadUrl?: string;          // 데스크톱 설치파일이면 채움
  githubUrl?: string;
  issueUrl?: string;

  // 콘텐츠
  screenshot?: string;           // /public 경로 (예: "/screenshots/slide-memo.png")
  quickStart: string[];          // 한 줄씩 단계
  features: { icon: string; title: string; desc: string }[];

  // 외부 연결
  blogPosts: { title: string; url: string }[];

  // 변경 이력
  changelog: { version: string; date: string; note: string }[];

  // 데스크톱 전용 (선택)
  requirements?: string[];

  // 자세한 사용 가이드 (선택)
  // true이면 /tools/[slug]/guide 페이지 생성
  // src/content/guides/[slug].mdx 파일이 있어야 함
  hasGuide?: boolean;

  // 통계 (Phase 2에서 채움. 지금은 undefined여도 됨)
  stats?: {
    downloads: number;     // GitHub Releases 누적 다운로드
    lastUpdated: string;   // ISO 날짜
  };
}

export const tools: Tool[] = [
  {
    slug: 'slide-memo',
    name: 'Slide Memo',
    tagline: '화면 가장자리에서 슬라이드로 펼쳐지는 Windows 메모장. 모든 데이터는 내 컴퓨터에만 저장됩니다.',
    category: 'desktop',
    status: 'active',
    icon: 'StickyNote',
    featured: true,
    screenshot: '/screenshots/slide-memo.png',
    downloadUrl: 'https://github.com/yujeong0411/SlideMemo/releases/latest/download/SlideMemo-Setup.exe',
    githubUrl: 'https://github.com/yujeong0411/SlideMemo',
    issueUrl: 'https://github.com/yujeong0411/SlideMemo/issues',
    quickStart: [
      'SlideMemo-Setup.exe를 다운로드해서 더블클릭하세요.',
      'PC 보호창이 뜨면 추가정보를 누르고 실행을 누르세요.',
      '시작 메뉴에서 Slide Memo를 실행하세요.',
      '화면 가장자리 세로 탭을 클릭하면 메모장이 펼쳐집니다.',
    ],
    features: [
      { icon: 'PanelRightOpen', title: '슬라이드 UI',   desc: '필요할 때 펼치고 다시 숨김' },
      { icon: 'Lock',           title: '로컬 저장',     desc: '모든 메모가 내 컴퓨터에만' },
      { icon: 'Sparkles',       title: 'AI 기능 (선택)', desc: '요약·번역·맞춤법, 본인 API 키 필요' },
      { icon: 'Mic',            title: '음성 → 메모',   desc: 'Whisper로 자동 변환' },
    ],
    requirements: [
      'Windows 10 이상',
      '디스크 공간 약 50MB',
      'AI 기능 사용 시: Anthropic / OpenAI / Gemini API 키 (선택)',
      '음성 녹음 사용 시: 마이크 + OpenAI API 키',
    ],
    blogPosts: [],
    changelog: [
      {
        version: '1.0.0',
        date: '2026.05.25',
        note: '최초 정식 릴리스. 슬라이드 UI, 로컬 SQLite 저장, AI 5종(요약·번역·맞춤법·제목·키워드), 음성 녹음, 다중 AI 제공자(Anthropic/OpenAI/Gemini/Ollama)',
      },
    ],
    hasGuide: true,  // src/content/guides/slide-memo.mdx 가 있어야 함
  },
];

// 슬러그로 단일 도구 조회
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
```

### `src/data/profile.ts`

```typescript
export const profile = {
  // 익명성 유지: 닉네임만 사용. 실명·소속 절대 표기 금지.
  name: 'nursecoder',
  tagline: '현장에서 코드를 짭니다',
  email: 'nursecoder@gmail.com',  // 별도 공개용 이메일
  github: 'https://github.com/yujeong0411',
  tistory: 'https://nursecoder.tistory.com',
} as const;
```

---

## 6. 구현 가이드

### 헬퍼: 카테고리 → 색 매핑

`src/lib/categoryStyles.ts`:

```typescript
import { ToolCategory } from '@/data/tools';

export const categoryStyles: Record<ToolCategory, { bg: string; fg: string; label: string }> = {
  web:     { bg: 'bg-coral-soft',    fg: 'text-coral',         label: 'Web' },
  bot:     { bg: 'bg-sage-soft',     fg: 'text-sage-deep',     label: 'Bot' },
  desktop: { bg: 'bg-lavender-soft', fg: 'text-lavender-deep', label: 'Desktop' },
  script:  { bg: 'bg-sage-soft',     fg: 'text-sage-deep',     label: 'Script' },
};
```

### 아이콘 동적 import

lucide-react는 아이콘이 named export로 들어있어요. 데이터에서 문자열로 받으니까 매핑이 필요해요:

```typescript
// src/components/Icon.tsx
import { LucideIcon, StickyNote, PanelRightOpen, Lock, Sparkles, Mic, ... } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  StickyNote, PanelRightOpen, Lock, Sparkles, Mic,
  // 새 도구 추가 시 여기에도 추가
};

export function Icon({ name, ...props }: { name: string } & React.ComponentProps<LucideIcon>) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component {...props} />;
}
```

### EmailRow 컴포넌트

이메일은 클릭 시 클립보드에 복사하는 클라이언트 컴포넌트로 구현:

```typescript
// src/components/EmailRow.tsx — 'use client'
// 클릭 시 navigator.clipboard.writeText(email) 호출
// 복사 완료 피드백: 아이콘·텍스트 교체 (Check 아이콘 + "복사됨")
```

### SEO

- `metadata` export로 페이지별 title/description
- Open Graph 이미지: `src/app/opengraph-image.tsx` (Next.js ImageResponse, edge runtime). 1200×630, 흰 배경에 헤드라인+배지+장식 원 구성
- 한국어 사이트니까 `lang="ko"` (layout.tsx)
- **metadata description에 실명·소속 표기 금지** (익명성 정책 동일 적용)

### 접근성
- 아이콘 단독으로 쓸 때 `aria-label` 또는 `aria-hidden="true"` + 인접 텍스트
- 이미지에 `alt` 필수
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`

---

## 7. 작업 순서 (Claude Code 권장 순서)

1. `create-next-app`으로 프로젝트 생성, globals.css에 색상·폰트 설정
2. `src/data/tools.ts`, `src/data/profile.ts` 생성 (위 데이터 그대로)
3. 공통 컴포넌트: `Header`, `Footer`, `Layout` (layout.tsx에 적용)
4. 재사용 컴포넌트: `ToolCard`, `CategoryBadge`, `StatusBadge`, `Icon`, `EmailRow`
5. **홈 페이지** 구현 — 끝나면 한 번 보고 진행
6. **도구 목록** 구현 — 필터 동작 확인
7. **도구 상세** 구현 — slug 라우팅, 모든 섹션 (가이드 CTA 카드는 `hasGuide` 조건부 렌더)
8. **About** 구현
9. **가이드 페이지 인프라 구축** (도구별 가이드가 필요할 때):
   - MDX 패키지 설치: `next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
   - `src/content/guides/` 디렉토리 생성
   - 가이드 페이지 라우트: `src/app/tools/[slug]/guide/page.tsx`
   - 커스텀 MDX 컴포넌트: `Shortcut`, `Callout`, `Steps`/`Step` (`src/components/mdx/`)
   - `generateStaticParams`로 `hasGuide: true`인 slug만 생성
   - 첫 가이드 작성: `src/content/guides/slide-memo.mdx`
10. 반응형 점검 (모바일 360px, 태블릿 768px, 데스크톱 1024px)
11. Vercel 배포 (`vercel --prod`)

---

## 8. 검수 체크리스트

배포 전 확인:

- [ ] 모든 페이지가 흰 배경 + surface 카드 톤 일관성 유지
- [ ] coral/sage/lavender 외 다른 강조색 안 썼는지
- [ ] 모바일에서 그리드가 1열로 잘 무너지는지
- [ ] 모든 외부 링크에 `target="_blank"` + 화살표/아이콘 표시
- [ ] 도구 상세 페이지에서 `liveUrl`/`downloadUrl` 분기 동작
- [ ] 빈 데이터(`blogPosts: []` 등)일 때 섹션 자체가 안 보이는지
- [ ] `hasGuide: false`인 도구는 가이드 CTA 카드가 안 보이고 `/guide` URL 접근 시 404
- [ ] `hasGuide: true`인데 MDX 파일이 없으면 빌드 에러 또는 명확한 메시지
- [ ] 가이드 페이지의 TOC가 본문 헤딩과 일치하는지
- [ ] 가이드 페이지의 `<Shortcut>`, `<Callout>`, `<Steps>` 컴포넌트 동작
- [ ] 가이드 페이지의 모바일 TOC가 접이식으로 동작
- [ ] 404 페이지 (잘못된 slug 접근)
- [ ] Pretendard 폰트가 실제로 로드되는지
- [x] favicon: `layout.tsx`의 `metadata.icons: { icon: "/logo-64.png" }`로 등록
- [ ] metadata description에 실명·소속 없는지

---

## 9. 향후 작업 (지금은 안 해도 됨)

- **다운로드/사용 통계 표시** (Phase 2)
  - 데스크톱 도구: GitHub Releases API에서 `download_count` 합산
    ```typescript
    // 빌드 시점에 호출, ISR로 주기적 갱신
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
    const releases = await res.json();
    const total = releases.reduce((sum, r) =>
      sum + r.assets.reduce((s, a) => s + a.download_count, 0), 0);
    ```
  - 웹앱: 별도 카운터가 필요할 때 Supabase에 이벤트 테이블 추가 (지금은 보류)
  - 표시 위치: 도구 카드 우측 하단, 변경 이력 위 등
  - `tool.stats?.downloads`가 있을 때만 렌더, 없으면 숨김 → **데이터 채워지면 자동 노출**
- 도구별 전체 변경 이력 페이지 (`/tools/[slug]/changelog`)
- 도구 추가 시 사이트 자동 빌드 (GitHub push → Vercel)
- 다크 모드 (지금 변수 구조라면 추가 쉬움)
- 검색 기능 (도구 5개 이상 될 때부터 의미 있음)
- 사이트맵 / RSS
- About 페이지 "숫자로 보는 활동" 섹션 (공개 도구 수 / 블로그 글 수 / 코딩 경력)
- 가이드 페이지 코드 블록 신택스 하이라이팅 (`rehype-pretty-code` 추가)
- 가이드 페이지 TOC 활성 섹션 강조 (스크롤 위치 기반)

---

## 10. 도구 배포 규칙 (사이트 운영 가이드)

이 사이트는 도구를 직접 호스팅하지 않고 외부로 링크만 보냅니다. 도구 종류별 배포 위치:

### 데스크톱 도구 (`.zip`, `.exe`, `.dmg`)
- **GitHub Releases**에 자산 업로드
- 사이트의 `downloadUrl`은 Releases 자산 URL을 직접 가리킴
  ```
  https://github.com/{owner}/{repo}/releases/latest/download/{file}.exe
  ```
- `/latest/download/` 패턴을 쓰면 새 버전 올릴 때 사이트 코드 수정 불필요
- **다운로드 카운트가 자동 누적됨** (Phase 2에서 표시할 때 활용)

### 웹앱
- 각자 배포 환경에 띄우고 (Render, Vercel, Supabase 등) `liveUrl`만 사이트에 등록
- 사이트는 단순히 외부 링크

### 스크립트 / 봇
- GitHub 저장소 README로 설치 가이드 → `githubUrl`만 등록

### 버전 표기 일관성
- 모든 도구는 SemVer (`v1.2.0` 형식) 사용
- GitHub Release 태그도 동일 (`v1.2.0`)
- 사이트의 `changelog` 데이터와 일치시킬 것


---

작업 중 막히거나 모호한 부분이 있으면 시안 캡처 이미지를 참고하세요. 색은 디자인 시스템 섹션의 값을 정확히 따르고, 임의로 추가하지 마세요.