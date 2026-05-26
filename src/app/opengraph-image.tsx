import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NurseCoder — 간호사가 만든 일상의 작은 도구들";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#FFFFFF",
          padding: "80px",
          gap: "24px",
        }}
      >
        {/* 로고 타입 */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              border: "1.5px solid rgba(139,107,115,0.12)",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#E89B9B" }}>&lt;</span>
            <span style={{ color: "#6FB089" }}>/</span>
            <span style={{ color: "#E89B9B" }}>&gt;</span>
          </div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#6B4F56",
              letterSpacing: "-0.3px",
            }}
          >
            <span style={{ color: "#E89B9B" }}>Nurse</span>
            <span style={{ color: "#6FB089" }}>Coder</span>
          </span>
        </div>

        {/* 헤드라인 */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 500,
            color: "#6B4F56",
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
          }}
        >
          현장에서 만든
          <br />
          일상의 작은 도구들
        </div>

        {/* 서브 카피 */}
        <div
          style={{
            fontSize: "22px",
            color: "#8E7680",
            lineHeight: 1.6,
          }}
        >
          필요해서 만들기 시작했어요.
          <br />
          누구나 다운로드해서 바로 쓸 수 있습니다.
        </div>

        {/* 배지 */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "8px",
            fontSize: "16px",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#E89B9B" }}>care</span>
          <span style={{ color: "#8E7680" }}>·</span>
          <span style={{ color: "#6FB089" }}>code</span>
          <span style={{ color: "#8E7680" }}>·</span>
          <span style={{ color: "#9B83BD" }}>create</span>
        </div>

        {/* 우측 장식 원 */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "80px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "#F2EDF7",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "160px",
            bottom: "100px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#FCEDED",
            opacity: 0.5,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
