import type { ToolCategory, ToolStatus } from "@/data/tools";

export const categoryStyles: Record<
  ToolCategory,
  { bg: string; fg: string; label: string }
> = {
  web: { bg: "bg-coral-soft", fg: "text-coral-deep", label: "Web" },
  bot: { bg: "bg-sage-soft", fg: "text-sage-deep", label: "Bot" },
  desktop: {
    bg: "bg-lavender-soft",
    fg: "text-lavender-deep",
    label: "Desktop",
  },
  script: { bg: "bg-sage-soft", fg: "text-sage-deep", label: "Script" },
};

export const statusStyles: Record<
  ToolStatus,
  { bg: string; fg: string; label: string }
> = {
  active: { bg: "bg-sage-soft", fg: "text-sage-deep", label: "Active" },
  beta: { bg: "bg-lavender-soft", fg: "text-lavender-deep", label: "Beta" },
  archived: {
    bg: "bg-[rgba(139,107,115,0.08)]",
    fg: "text-ink-mute",
    label: "Archived",
  },
};
