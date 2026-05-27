export function Step({
  title,
  children,
  index = 0,
}: {
  title: string;
  children?: React.ReactNode;
  index?: number;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 shrink-0 rounded-full bg-coral-soft text-coral text-[12px] flex items-center justify-center mt-0.5">
        {index + 1}
      </span>
      <div className="space-y-1 pt-0.5">
        <p className="text-ink text-[14px] lg:text-[16px]">{title}</p>
        {children && (
          <div className="text-ink-soft text-[13px] lg:text-[15px] leading-snug">{children}</div>
        )}
      </div>
    </li>
  );
}

Step.displayName = "Step";
