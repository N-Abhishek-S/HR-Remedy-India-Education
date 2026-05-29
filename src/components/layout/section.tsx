import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "light" | "dark" | "hero" | "cta" | "custom";
  id?: string;
} & ComponentPropsWithoutRef<"section">;

const spacingMap = {
  none: "",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-22",
  xl: "py-20 sm:py-28",
} as const;

const backgroundMap = {
  white: "bg-white",
  light: "section-bg-light",
  dark: "section-bg-dark text-white",
  hero: "section-bg-hero text-white",
  cta: "section-bg-cta text-white",
  custom: "",
} as const;

export function Section({
  children,
  className,
  spacing = "lg",
  background = "custom",
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingMap[spacing],
        backgroundMap[background],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
