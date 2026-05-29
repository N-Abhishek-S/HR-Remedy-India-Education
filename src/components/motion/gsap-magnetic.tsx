"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GsapMagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly strength?: number;
}

export function GsapMagnetic({
  children,
  className,
  strength = 0.3,
}: GsapMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    let disposed = false;
    let cleanupFns: (() => void)[] = [];

    if (!element) {
      return;
    }

    const magneticElement = element;

    /* Disabled for reduced motion or non-desktop */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    async function animate() {
      const { default: gsap } = await import("gsap");

      if (disposed) {
        return;
      }

      const maxMove = strength * 20;

      const xTo = gsap.quickTo(magneticElement, "x", {
        duration: 0.4,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(magneticElement, "y", {
        duration: 0.4,
        ease: "power2.out",
      });

      function handleMouseMove(e: MouseEvent) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        /* Clamp movement within the maxMove radius */
        const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX * strength));
        const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY * strength));

        xTo(moveX);
        yTo(moveY);
      }

      function handleMouseLeave() {
        xTo(0);
        yTo(0);
      }

      magneticElement.addEventListener("mousemove", handleMouseMove);
      magneticElement.addEventListener("mouseleave", handleMouseLeave);

      cleanupFns.push(() => {
        magneticElement.removeEventListener("mousemove", handleMouseMove);
        magneticElement.removeEventListener("mouseleave", handleMouseLeave);
        gsap.set(magneticElement, { x: 0, y: 0 });
      });
    }

    void animate();

    return () => {
      disposed = true;
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
