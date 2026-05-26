"use client";
import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-coral text-white shadow-md flex items-center justify-center hover:bg-coral/90 transition-colors"
      aria-label="맨 위로"
    >
      <span className="material-icons" style={{ fontSize: "20px" }}>
        arrow_upward
      </span>
    </button>
  );
}
