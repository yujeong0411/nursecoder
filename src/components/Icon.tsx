import type { LucideIcon, LucideProps } from "lucide-react";
import {
  CalendarHeart,
  ShieldCheck,
  CalendarRange,
  FileSpreadsheet,
  StickyNote,
  PanelRightOpen,
  Lock,
  Sparkles,
  Mic,
  Bot,
  Newspaper,
  Send,
  Bookmark,
  Notebook,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Plus,
  Mail,
  BookOpen,
  Briefcase,
  FlaskConical,
  Wrench,
  AlertCircle,
  Download,
  ExternalLink,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  CalendarHeart,
  ShieldCheck,
  CalendarRange,
  FileSpreadsheet,
  StickyNote,
  PanelRightOpen,
  Lock,
  Sparkles,
  Mic,
  Bot,
  Newspaper,
  Send,
  Bookmark,
  Notebook,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Plus,
  Mail,
  BookOpen,
  Briefcase,
  FlaskConical,
  Wrench,
  AlertCircle,
  Download,
  ExternalLink,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component {...props} />;
}
