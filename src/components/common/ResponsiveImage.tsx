import type { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
};

export function ResponsiveImage({ fill = false, className, loading = "lazy", ...props }: ResponsiveImageProps) {
  return (
    <img
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
