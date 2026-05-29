"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GsapPinProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly pinSpacerClassName?: string;
}

export function GsapPin({
  children,
  className,
  pinSpacerClassName,
}: GsapPinProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    let ctx: { revert: () => void } | undefined;
    let disposed = false;

    if (!element) {
      return;
    }

    const pinElement = element;

    /* Don't pin when reduced motion is preferred */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    async function animate() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: pinElement,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          onRefresh: (self) => {
            /* Apply optional className to the generated pin-spacer wrapper */
            if (pinSpacerClassName && self.pin) {
              const spacer = self.pin.parentElement;
              if (spacer?.classList.contains("pin-spacer")) {
                pinSpacerClassName
                  .split(" ")
                  .filter(Boolean)
                  .forEach((cls) => spacer.classList.add(cls));
              }
            }
          },
        });
      }, pinElement);
    }

    void animate();

    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [pinSpacerClassName]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
