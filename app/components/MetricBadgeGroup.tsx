"use client";

import type { HTMLAttributes } from "react";

export default function MetricBadgeGroup({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const composedClassName = ["metric-badge-group", className].filter(Boolean).join(" ");

  return (
    <div className={composedClassName} {...props}>
      {children}
    </div>
  );
}
