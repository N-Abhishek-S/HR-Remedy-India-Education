import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ResponsiveGrid({
  children,
  className,
  columns = 3,
}: Readonly<{
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}>) {
  return (
    <div
      className={cn(
        "grid gap-5",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
