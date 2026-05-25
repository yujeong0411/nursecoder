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
Styling:    Tailwind CSS v4
Icons:      lucide-react (또는 @tabler/icons-react)
Fonts:      Pretendard (한글), Inter (영문)
배포:        Vercel
콘텐츠:      TypeScript 객체 (data/tools.ts)
```

설치 명령:
```bash
npx create-next-app@latest nursecoder \
  --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
cd nursecoder
npm install lucide-react
```

---

## 3. 디자인 시스템

### 색상 (Tailwind config에 등록)

```js
// tailwind.config.ts colors
colors: {
  // 베이스
  bg:        '#FFFFFF',      // 페이지 배경
  surface:   '#FAFBF9',      // 카드 배경 (살짝 띄움)
  
  // 브랜드 (로고에서 추출)
  coral:     '#E89B9B',      // 메인 포인트 (Nurse)
  sage:      '#A8D4B9',      // 보조 포인트 (Coder)
  lavender:  '#C9B8E0',      // 강조 / 데스크톱 카테고리
  
  // 도구 카테고리 (배경용 옅은 톤)
  'coral-soft':    '#FCEDED',
  'sage-soft':     '#EAF4EE',
  'lavender-soft': '#F2EDF7',
  
  // 도구 카테고리 (텍스트용 진한 톤)
  'sage-deep':     '#6FB089',
  'lavender-deep': '#9B83BD',
  
  // 텍스트
  ink:       '#6B4F56',      // 본문 강조 (제목)
  'ink-soft':'#8B6B73',      // 본문 일반
  'ink-mute':'#A89399',      // 메타정보 (날짜 등)
  
  // 테두리
  hairline:  'rgba(139, 107, 115, 0.12)',
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
- 페이지 max-width는 `max-w-3xl` (~768px), 가운데 정렬
- 페이지 좌우 패딩: `px-7` (28px)
- 섹션 간 수직 간격: `space-y-9` (~36px)

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
│       └── page.tsx    # 도구 상세 /tools/[slug]
└── about/
    └── page.tsx        # About /about
```

### 4.1 공통 레이아웃

**헤더** (`src/components/Header.tsx`)
- 좌측 로고: 28x28 흰 박스 안에 `</>` (coral + sage), 옆에 "NurseCoder" 텍스트 (Nurse=coral, Coder=sage)
- 우측 네비: `Tools`, `About`, `Blog ↗` (블로그는 외부 링크, `target="_blank"`)
- 배경 흰색, 하단에 hairline 보더, padding `py-4 px-7`

**푸터** (`src/components/Footer.tsx`)
- 좌측: `made with ♥ by nursecoder` (♥는 coral)
- 우측: GitHub / Tistory 아이콘 링크
- 상단에 hairline 보더, padding `py-5 px-7`

### 4.2 홈 (`/`)

섹션 구성:
1. **Hero**
   - 배지: `care · code · create` (각 단어 색: coral / sage / lavender)
   - 헤드라인: `현장에서 만든\n일상의 작은 도구들` (34px, ink 색, line-height 1.25)
   - 서브카피: `필요해서 만들기 시작했어요.\n누구나 다운로드해서 바로 쓸 수 있습니다.`
   - 버튼 2개: `도구 둘러보기` (coral 배경/흰 글씨) / `소개` (흰 배경/ink-soft 글씨/border)
   - 우측에 장식 요소: 작은 라벤더 원, sage `+`, coral 하트 (절대위치, 옅은 opacity)

2. **대표 도구** (헤더 + "전체 보기 →")
   - 카드 그리드: `grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3`
   - 카드는 `tools.featured === true`인 것만, 최대 3개
   - 각 카드: 아이콘(카테고리 색), 카테고리 배지, 이름, 한 줄 설명, 버전+업데이트 시점

### 4.3 도구 목록 (`/tools`)

1. **페이지 타이틀**: `도구 모음` + 한 줄 부제 `내가 만든 것들을 모두 모아뒀어요.`
2. **필터바**: 카테고리 칩 (`전체` / `Web` / `Bot` / `Desktop` / `Script`)
   - 클라이언트 컴포넌트로 처리, useState로 활성 카테고리 관리
   - 칩 활성: coral 배경 + 흰 글씨, 비활성: surface 배경 + ink-soft
3. **카드 그리드**: 홈과 동일한 카드 디자인, 전체 도구 표시

### 4.4 도구 상세 (`/tools/[slug]`)

**`generateStaticParams`로 모든 slug 정적 생성.** 데이터 못 찾으면 `notFound()`.

섹션 순서:
1. **Breadcrumb**: `Tools › {tool.name}` (ink-mute 색, 12px)
2. **Hero 블록**:
   - 좌측 56x56 아이콘 (카테고리 색)
   - 우측: 이름 (24px) + Web/Active 배지 + 한 줄 설명
3. **액션 버튼들**: 도구 타입에 따라 분기
   - `liveUrl`이 있으면: `바로 사용하기` (coral 채움)
   - `downloadUrl`이 있으면: `다운로드` (coral 채움)
   - 항상: `GitHub` (흰 배경/border), `이슈 신고` (흰 배경/border)
4. **스크린샷**: `tool.screenshot` 경로의 이미지. 없으면 placeholder 박스. 비율 16:9, 둥근 모서리.
5. **빠른 시작**: 번호 원형 배지 + 한 줄 문장. 카드로 감쌈.
6. **주요 기능**: 3-4개 카드 그리드. 각 카드 = 아이콘 + 제목 + 한 줄.
7. **관련 글**: `tool.blogPosts` 배열, 각 항목 = 노트북 아이콘 + 제목 + 외부링크 화살표.
8. **변경 이력**: 최신 3개 + "전체 보기 →". 각 항목 = 버전 배지 + 날짜 + 한 줄 변경사항. 최신 버전에 `latest` 배지(sage 색).
9. (선택) **시스템 요구사항**: 데스크톱 도구일 때만.

### 4.5 About (`/about`)

**중요: 익명성 유지를 위한 가이드라인**
- 실명, 소속 병원·기관·부서 이름, 컨소시엄 이름은 **절대 표기 금지**
- 직무는 추상적 표현만 사용 ("의료 현장", "임상 환경" 등)
- 표시명은 `nursecoder` 닉네임만 사용
- 본인 사진 사용 금지, 로고 일러스트로 대체

1. **Hero (가운데 정렬)**:
   - 96x96 원형 박스에 `logo-mark.svg` 로고 일러스트
   - 표시명 `nursecoder` (28px)
   - 한 줄 `현장에서 코드를 짭니다`
   - `care · code · create` 배지

2. **소개**: 2단락의 본문 글. surface 카드 안에. 본문은 아래 카피 사용:
   > 의료 현장에서 일하다가 직접 필요한 도구를 만들기 시작했어요. 반복되는 일을 줄이고 싶어서 파이썬을 배웠고, 그게 첫 도구가 됐어요.
   >
   > 지금은 본업을 하면서 동료들이 진짜로 쓸 수 있는 작은 도구들을 만들고 있어요. 거창한 제품은 아니지만 누군가의 하루를 5분 줄여줄 수 있다면 그걸로 만족해요.

3. **하는 일**: 3개 카드 (구체적 소속·직책 없이 추상적으로)
   - "의료 현장 업무" (microscope/heart-pulse 아이콘)
   - "사이드 프로젝트 개발" (code 아이콘)
   - "기술 블로그 운영" (notebook 아이콘)

4. **숫자로 보는 활동**: 3개 카드 (공개한 도구 / 블로그 글 / 코딩 경력) — 숫자 색은 각각 coral / sage-deep / lavender-deep
5. **연락하기**: Email / GitHub / Tistory 3개 행. 각 행 = 아이콘 + 라벨 + 부가설명 + 우측 화살표.
   - Email은 메인 이메일이 아닌 **별도 공개용 이메일** 사용

---

## 5. 데이터 모델

### `src/data/tools.ts`

```typescript
export type ToolCategory = 'web' | 'bot' | 'desktop' | 'script';
export type ToolStatus = 'active' | 'beta' | 'archived';

export interface Tool {
  slug: string;                  // URL용 (예: "nurse-scheduler")
  name: string;
  tagline: string;               // 한 줄 설명
  category: ToolCategory;
  status: ToolStatus;
  icon: string;                  // lucide-react 아이콘 이름
  featured?: boolean;            // 홈에 노출
  
  // 액션
  liveUrl?: string;              // 웹앱이면 채움
  downloadUrl?: string;          // 데스크톱 zip 등이면 채움
  githubUrl?: string;
  issueUrl?: string;
  
  // 콘텐츠
  screenshot?: string;           // /public 경로 (예: "/screenshots/nurse-scheduler.png")
  quickStart: string[];          // 한 줄씩 단계
  features: { icon: string; title: string; desc: string }[];
  
  // 외부 연결
  blogPosts: { title: string; url: string }[];
  
  // 변경 이력
  changelog: { version: string; date: string; note: string }[];
  
  // 데스크톱 전용 (선택)
  requirements?: string[];
  
  // 통계 (Phase 2에서 채움. 지금은 undefined여도 됨)
  stats?: {
    downloads: number;     // GitHub Releases 누적 다운로드
    lastUpdated: string;   // ISO 날짜
  };
}

export const tools: Tool[] = [
  {
    slug: 'nurse-scheduler',
    name: 'Nurse Scheduler',
    tagline: '응급실 간호사 근무표를 PIN 인증 한 번으로 자동 생성합니다.',
    category: 'web',
    status: 'active',
    icon: 'CalendarHeart',
    featured: true,
    liveUrl: 'https://nurse-scheduler.onrender.com',
    githubUrl: 'https://github.com/choiyujeong/nurse-scheduler',
    issueUrl: 'https://github.com/choiyujeong/nurse-scheduler/issues',
    quickStart: [
      '관리자에게 PIN 번호를 받으세요',
      '사이트에 접속해서 PIN으로 로그인',
      '28일 주기로 원하는 근무일을 표시합니다',
      '관리자가 자동 생성된 근무표를 Excel로 받습니다',
    ],
    features: [
      { icon: 'ShieldCheck', title: 'PIN 인증', desc: '개인정보 없이 안전하게' },
      { icon: 'CalendarRange', title: '28일 주기', desc: '병원 스케줄에 맞춤' },
      { icon: 'FileSpreadsheet', title: 'Excel 내보내기', desc: '관리자 패널 한 번에' },
    ],
    blogPosts: [
      { title: 'PyQt6에서 웹으로 옮긴 이유', url: 'https://nursecoder.tistory.com/...' },
      { title: 'OR-Tools로 근무표 제약 조건 풀기', url: 'https://nursecoder.tistory.com/...' },
    ],
    changelog: [
      { version: '1.2.0', date: '2026.05.12', note: '생리 휴가 평일 자동 배정, 점수 차감 내역 표시' },
      { version: '1.1.0', date: '2026.04.20', note: '한국 공휴일 자동 인식, 주차별 시각 구분선 추가' },
      { version: '1.0.0', date: '2026.03.05', note: '최초 웹 버전 릴리스' },
    ],
  },
  // 다른 도구들은 빈 템플릿으로 1-2개 더 추가해주세요 (Stock Study Bot, Scheduler Pro 등)
];
```

### `src/data/profile.ts`

```typescript
export const profile = {
  // 익명성 유지: 닉네임만 사용. 실명·소속 절대 표기 금지.
  name: 'nursecoder',
  tagline: '현장에서 코드를 짭니다',
  email: 'TODO: 별도 공개용 이메일로 교체 (메인 이메일 사용 금지)',
  github: 'https://github.com/yujeong0411',
  tistory: 'https://nursecoder.tistory.com',
  
  stats: {
    tools: 2,         // 실제 공개한 도구 수로 변경
    blogPosts: 0,     // 실제 블로그 글 수로 변경
    yearsOfCoding: 3, // 실제 경력으로 변경
  },
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
import { LucideIcon, CalendarHeart, ShieldCheck, CalendarRange, FileSpreadsheet, ... } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  CalendarHeart, ShieldCheck, CalendarRange, FileSpreadsheet,
  // 필요한 아이콘들 추가
};

export function Icon({ name, ...props }: { name: string } & React.ComponentProps<LucideIcon>) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component {...props} />;
}
```

### SEO

- `metadata` export로 페이지별 title/description
- Open Graph 이미지 (`/public/og.png`)는 일단 placeholder로 두고 나중에 추가
- 한국어 사이트니까 `lang="ko"` (layout.tsx)

### 접근성
- 아이콘 단독으로 쓸 때 `aria-label` 또는 `<span className="sr-only">` 추가
- 이미지에 `alt` 필수
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`

---

## 7. 작업 순서 (Claude Code 권장 순서)

1. `create-next-app`으로 프로젝트 생성, Tailwind 색상·폰트 설정
2. `src/data/tools.ts`, `src/data/profile.ts` 생성 (위 데이터 그대로)
3. 공통 컴포넌트: `Header`, `Footer`, `Layout` (layout.tsx에 적용)
4. 재사용 컴포넌트: `ToolCard`, `CategoryBadge`, `StatusBadge`, `Icon`
5. **홈 페이지** 구현 — 끝나면 한 번 보고 진행
6. **도구 목록** 구현 — 필터 동작 확인
7. **도구 상세** 구현 — slug 라우팅, 모든 섹션
8. **About** 구현
9. 반응형 점검 (모바일 360px, 태블릿 768px, 데스크톱 1024px)
10. Vercel 배포 (`vercel --prod`)

---

## 8. 검수 체크리스트

배포 전 확인:

- [ ] 모든 페이지가 흰 배경 + surface 카드 톤 일관성 유지
- [ ] coral/sage/lavender 외 다른 강조색 안 썼는지
- [ ] 모바일에서 그리드가 1열로 잘 무너지는지
- [ ] 모든 외부 링크에 `target="_blank"` + 화살표/아이콘 표시
- [ ] 도구 상세 페이지에서 `liveUrl`/`downloadUrl` 분기 동작
- [ ] 빈 데이터(`blogPosts: []` 등)일 때 섹션 자체가 안 보이는지
- [ ] 404 페이지 (잘못된 slug 접근)
- [ ] Pretendard 폰트가 실제로 로드되는지
- [ ] favicon 자리 (없으면 임시로 `</>` 이모지 SVG)

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
  - 카드 컴포넌트는 `tool.stats?.downloads`가 있을 때만 렌더, 없으면 숨김 → **데이터 채워지면 자동 노출**
- 도구별 전체 변경 이력 페이지 (`/tools/[slug]/changelog`)
- 도구 추가 시 사이트 자동 빌드 (GitHub push → Vercel)
- 다크 모드 (지금 변수 구조라면 추가 쉬움)
- 검색 기능 (도구 5개 이상 될 때부터 의미 있음)
- 사이트맵 / RSS

---

## 10. 도구 배포 규칙 (사이트 운영 가이드)

이 사이트는 도구를 직접 호스팅하지 않고 외부로 링크만 보냅니다. 도구 종류별 배포 위치:

### 데스크톱 도구 (`.zip`, `.exe`, `.dmg`)
- **GitHub Releases**에 자산 업로드
- 사이트의 `downloadUrl`은 Releases 자산 URL을 직접 가리킴
  ```
  https://github.com/{owner}/{repo}/releases/latest/download/{file}.zip
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