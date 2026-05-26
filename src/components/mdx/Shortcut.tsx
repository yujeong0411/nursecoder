export function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="bg-surface border border-hairline rounded-md px-1.5 py-0.5 text-[12px] font-mono text-ink">
      {children}
    </kbd>
  );
}
