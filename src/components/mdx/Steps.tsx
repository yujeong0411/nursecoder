import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
  let stepIndex = 0;
  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(
      child as React.ReactElement<{ index: number }>,
      { index: stepIndex++ }
    );
  });
  return (
    <ol className="bg-surface border border-hairline rounded-xl p-5 space-y-3 my-4 list-none">
      {items}
    </ol>
  );
}
