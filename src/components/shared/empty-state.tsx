import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: Readonly<{
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={cn(
        "rounded-lg border border-dashed border-border bg-card p-8 text-center",
        className,
      )}
    >
      <div className="mx-auto max-w-md space-y-3">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </section>
  );
}
