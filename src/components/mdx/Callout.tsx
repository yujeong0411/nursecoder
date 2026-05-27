import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CalloutType = "tip" | "warning" | "info";

const STYLES: Record<
  CalloutType,
  { bg: string; border: string; icon: LucideIcon; iconColor: string }
> = {
  tip: {
    bg: "bg-sage-soft",
    border: "border-sage",
    icon: Lightbulb,
    iconColor: "text-sage-deep",
  },
  warning: {
    bg: "bg-coral-soft",
    border: "border-coral",
    icon: AlertTriangle,
    iconColor: "text-coral-deep",
  },
  info: {
    bg: "bg-lavender-soft",
    border: "border-lavender",
    icon: Info,
    iconColor: "text-lavender-deep",
  },
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const s = STYLES[type];
  const Icon = s.icon;
  return (
    <div
      className={`${s.bg} border-l-2 ${s.border} rounded-r-lg p-4 my-4 flex gap-3`}
    >
      <Icon
        className={`w-4 h-4 ${s.iconColor} shrink-0 mt-0.5`}
        aria-hidden="true"
      />
      <div className="callout-content text-ink-soft leading-relaxed">{children}</div>
    </div>
  );
}
